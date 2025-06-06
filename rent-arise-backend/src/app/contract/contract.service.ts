import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { LessThanOrEqual, Repository } from 'typeorm';
import { ContractEntity } from './entity/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContractDto } from './dto/create-contract-dto';
import { UserService } from '../user/user.service';
import { ContractResponseDto } from './dto/contract-response-dto';
import { Role } from '../user/enums/role.enum';
import { UpdateContractDto } from './dto/update-contract-dto';
import { ProductService } from '../product/product.service';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';
import { Status } from './enums/status.enum';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(ContractEntity)
        private readonly contractRepository: Repository<ContractEntity>,
        private readonly userService: UserService,
        private readonly productService: ProductService,
    ) {}

    private calculateContractValue(startDate: Date, endDate: Date, pricePerDay: number): number {
        const start = new Date(startDate);
        const end = new Date(endDate);

        start.setHours(0, 0, 0, 0);
        end.setHours(0, 0, 0, 0);

        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

        return diffDays * pricePerDay;
    }

    private async updateExpiredContracts(): Promise<void> {
        const now = new Date();

        const expiredContracts = await this.contractRepository.find({
            where: [
            { endDate: LessThanOrEqual(now), status: Status.PENDING },
            { endDate: LessThanOrEqual(now), status: Status.ACTIVE },
            ],
        });

        for (const contract of expiredContracts) {
            if (contract.status === Status.PENDING) {
            contract.status = Status.CANCELLED;
            } else if (contract.status === Status.ACTIVE) {
            contract.status = Status.COMPLETED;
            }
        }
        await this.contractRepository.save(expiredContracts);
    }

    async create(createDto: CreateContractDto, payload: JwtPayload): Promise<ContractResponseDto> {
        const [tenant, product] = await Promise.all([
            this.userService.findByUsername(payload.username),
            this.productService.findOne(createDto.productId),
        ]);

        if (!tenant) throw new NotFoundException('Tenant not found.');
        if (!product) throw new NotFoundException('Product not found.');

        createDto.value = this.calculateContractValue(createDto.startDate, createDto.endDate, product.pricePerDay);

        const contract = this.contractRepository.create({
            ...createDto,
            tenant,
            product,
        });

        const savedContract = await this.contractRepository.save(contract);

        return {
            ...savedContract,
            tenant: {
                id: tenant.id,
                username: tenant.username,
                role: tenant.role,
            },
            product: {
                id: product.id,
                name: product.name,
                description: product.description,
                mainPhoto: product.mainPhoto,
                user: {
                    id: product.user.id,
                    username: product.user.username,
                },
            },
        };
    }

    async findOne(id: string): Promise<ContractEntity> {
        try {
            return await this.contractRepository.createQueryBuilder('contract')
                .withDeleted()
                .leftJoinAndSelect('contract.tenant', 'tenant')
                .leftJoinAndSelect('contract.product', 'product')
                .leftJoinAndSelect('product.user', 'productUser')
                .select([
                    'contract',
                    'tenant.id',
                    'tenant.username',
                    'tenant.role',
                    'product.id',
                    'product.name',
                    'product.description',
                    'product.mainPhoto',
                    'productUser.id',
                    'productUser.username',
                ])
                .where('contract.id = :id', { id })
                .getOneOrFail();
        } catch {
            throw new NotFoundException('Contract not found.');
        }
    }

    async findAll(payload: JwtPayload): Promise<ContractResponseDto[]> {
        await this.updateExpiredContracts();

        const user = await this.userService.findByUsername(payload.username);
        if (!user) throw new NotFoundException('User not found.');

        return await this.contractRepository.createQueryBuilder('contract')
            .withDeleted()
            .leftJoinAndSelect('contract.tenant', 'tenant')
            .leftJoinAndSelect('contract.product', 'product')
            .leftJoinAndSelect('product.user', 'productUser')
            .select([
                'contract',
                'tenant.id',
                'tenant.username',
                'tenant.role',
                'product.id',
                'product.name',
                'product.description',
                'product.mainPhoto',
                'productUser.id',
                'productUser.username',
            ])
            .getMany();
    }

    async findMyContracts(payload: JwtPayload): Promise<ContractResponseDto[]> {
        await this.updateExpiredContracts();
        
        const tenant = await this.userService.findByUsername(payload.username);
        if (!tenant) throw new NotFoundException('Tenant not found.');

        return await this.contractRepository.createQueryBuilder('contract')
            .withDeleted()
            .leftJoinAndSelect('contract.tenant', 'tenant')
            .leftJoinAndSelect('contract.product', 'product')
            .leftJoinAndSelect('product.user', 'productUser')
            .select([
                'contract',
                'tenant.id',
                'tenant.username',
                'tenant.role',
                'product.id',
                'product.name',
                'product.description',
                'product.mainPhoto',
                'productUser.id',
                'productUser.username',
            ])
            .where('tenant.id = :tenantId', { tenantId: tenant.id })
            .getMany();
    }

    async update(id: string, updateDto: UpdateContractDto, payload: JwtPayload) {
        const [tenant, contract] = await Promise.all([
            this.userService.findByUsername(payload.username),
            this.findOne(id),
        ]);

        if (!tenant) throw new NotFoundException('Tenant not found.');
        if (contract.tenant.id !== tenant.id) {
            throw new ForbiddenException('Not allowed to update a contract you did not create.');
        }

        if (updateDto.startDate) {
            const now = new Date();
            const start = new Date(updateDto.startDate);
            if (start <= now) throw new BadRequestException('Start date must be in the future.');
        }

        if (updateDto.startDate && updateDto.endDate) {
            const start = new Date(updateDto.startDate);
            const end = new Date(updateDto.endDate);
            if (end <= start) throw new BadRequestException('End date must be greater than start date.');
        }

        this.contractRepository.merge(contract, updateDto);
        return await this.contractRepository.save(contract);
    }

    async deleteById(id: string, payload: JwtPayload): Promise<void> {
        const [tenant, contract] = await Promise.all([
            this.userService.findByUsername(payload.username),
            this.findOne(id),
        ]);

        if (!tenant) throw new NotFoundException('Tenant not found.');
        if (contract.tenant.id !== tenant.id && tenant.role !== Role.ADMIN) {
            throw new ForbiddenException('Not allowed to delete this contract.');
        }

        contract.status = Status.CANCELLED;
        await this.contractRepository.save(contract);
        
        await this.contractRepository.softDelete(id);
    }
}