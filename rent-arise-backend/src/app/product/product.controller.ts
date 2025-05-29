import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product-dto';
import { FileProductDto } from './dto/file-product-dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtPayload } from '@supabase/supabase-js';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createDto: CreateProductDto, @UploadedFile() file: FileProductDto, @CurrentUser() payload: JwtPayload,) {

    return this.productService.create(createDto, file, payload);
  }
}
