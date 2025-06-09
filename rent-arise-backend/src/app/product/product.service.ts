import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product-dto';
import { UploadService } from './upload.service';
import { FileProductDto } from './dto/file-product-dto';
import { UserService } from '../user/user.service';
import { ProductResponseDto } from './dto/product-response-dto';
import { UpdateProductDto } from './dto/update-product-dto';
import { Role } from '../user/enums/role.enum';
import { JwtPayload } from '../auth/interfaces/jwt-payload.interface';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly uploadService: UploadService,
        private readonly userService: UserService,
    ) {}

    async create(createDto: CreateProductDto, payload: JwtPayload, file?: FileProductDto): Promise<ProductResponseDto> {
        const user = await this.userService.findByUsername(payload.username);

        if (!user) {
            throw new NotFoundException('User not found.');
        }
        
        createDto.user = user;

        if  (file) {
            const path = `${user.id}-${file.originalname}`;
            const imageUrl = await this.uploadService.uploadImage(file, path);
            createDto.mainPhoto = imageUrl;
        }

        const savedProduct = await this.productRepository.save(this.productRepository.create(createDto));

        return {...savedProduct,
                user: {
                    id: savedProduct.user.id,
                    username: savedProduct.user.username,
                    role: savedProduct.user.role,
            }
        };
    }

    async findOne(id: string): Promise<ProductEntity> {
        try {

            return await this.productRepository.createQueryBuilder('product')
                .leftJoinAndSelect('product.user', 'user')
                .select(['product', 'user.id', 'user.username', 'user.role',])
                .where('product.id = :id', { id })
                .getOneOrFail();
        } catch {
            throw new NotFoundException('Product not found.');
        }
    }

    async findAll(payload: JwtPayload): Promise<ProductEntity[]> {
        const user = await this.userService.findByUsername(payload.username);

        return await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.user', 'user')
            .select(['product', 'user.id', 'user.username', 'user.role'])
            .where('user.id != :userId', { userId: user?.id })
            .getMany();
    }

    async findAllMyProducts(payload: JwtPayload): Promise<ProductEntity[]> {
        const user = await this.userService.findByUsername(payload.username);

        return await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.user', 'user')
            .select(['product', 'user.id', 'user.username', 'user.role'])
            .where('user.id = :userId', { userId: user?.id })
            .getMany();
    }

    async update(id: string, updateDto: UpdateProductDto, payload: JwtPayload){
        const [user, product] = await Promise.all([
            this.userService.findByUsername(payload.username),
            this.findOne(id),
        ]);

        if (product.user.id !== user?.id) {
            throw new ForbiddenException('Not allowed to update a product you did not create.');
        }

        this.productRepository.merge(product, updateDto);
        return await this.productRepository.save(product);
    }

    async deleteById(id: string, payload: JwtPayload) {
        const [user, product] = await Promise.all([
            this.userService.findByUsername(payload.username),
            this.findOne(id),
        ]);

        if (product.user.id !== user?.id && user?.role !== Role.ADMIN) {
            throw new ForbiddenException('Not allowed to delete a product you did not create.');
        }

        return await this.productRepository.softDelete(id);
    }
}
