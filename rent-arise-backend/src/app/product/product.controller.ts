import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductService } from './product.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product-dto';
import { FileProductDto } from './dto/file-product-dto';
import { CurrentUser } from '../decorators/current-user.decorator';
import { JwtPayload } from '@supabase/supabase-js';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProductDto } from './dto/update-product-dto';
import { DocCreateProduct, DocDeleteProduct, DocGetAvailableProducts, DocGetMyProducts, DocShowProduct, DocUpdateProduct } from './docs/product.docs';
import { ApiTags } from '@nestjs/swagger';

@Controller('api/products')
@ApiTags('Products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @DocCreateProduct()
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() createDto: CreateProductDto, @UploadedFile() file: FileProductDto, @CurrentUser() payload: JwtPayload) {
    return this.productService.create(createDto, payload, file);
  }

  @Get('/available')
  @DocGetAvailableProducts()
  async findAll(@CurrentUser() payload: JwtPayload) {
    return this.productService.findAll(payload);
  }

  @Get('/my')
  @DocGetMyProducts()
  async findAllMyProducts(@CurrentUser() payload: JwtPayload) {
    return this.productService.findAllMyProducts(payload);
  }

  @Get(':id')
  @DocShowProduct()
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.productService.findOne(id);
  }

  @Put(':id')
  @DocUpdateProduct()
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateDto: UpdateProductDto, @CurrentUser() payload: JwtPayload) {
    return this.productService.update(id, updateDto, payload);
  }
  
  @Delete(':id')
  @DocDeleteProduct()
  async delete(@Param('id', new ParseUUIDPipe()) id: string, @CurrentUser() payload: JwtPayload) {
    await this.productService.deleteById(id, payload);
  }
}
