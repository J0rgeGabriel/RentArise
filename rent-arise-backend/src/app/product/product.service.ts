import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductEntity } from './entity/product.entity';
import { Repository } from 'typeorm/repository/Repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product-dto';
import { UploadService } from './upload.service';
import { FileProductDto } from './dto/file-product-dto';
import { JwtPayload } from '@supabase/supabase-js';
import { UserService } from '../user/user.service';
import { ProductResponseDto } from './dto/product-response-dto';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(ProductEntity)
        private readonly productRepository: Repository<ProductEntity>,
        private readonly uploadService: UploadService,
        private readonly userService: UserService,
    ) {}

    async create(createDto: CreateProductDto, file?: FileProductDto, payload?: JwtPayload): Promise<ProductResponseDto> {
        const user = await this.userService.findByUsername(payload?.username);

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

    async findAll(): Promise<ProductEntity[]> {
        return await this.productRepository
            .createQueryBuilder('product')
            .leftJoinAndSelect('product.user', 'user')
            .select(['product', 'user.id', 'user.username', 'user.role',])
            .getMany();
    }
}
