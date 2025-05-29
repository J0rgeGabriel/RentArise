import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entity/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadService } from './upload.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]),
    forwardRef(() => UserModule)],
  controllers: [ProductController],
  providers: [ProductService, UploadService],
  exports: [ProductService, UploadService]
})
export class ProductModule {}
