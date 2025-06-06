import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { UserEntity } from "src/app/user/entity/user.entity";

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name of product is required' })
  @IsString()
  @ApiProperty({ description: 'Name of the product' })
  name: string;

  @IsNotEmpty({ message: 'Product description is required' })
  @IsString()
  @ApiProperty({ description: 'Product description' })
  description: string;

  @Type(() => Number)
  @IsNotEmpty({ message: 'Price per day is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  @ApiProperty({ description: 'Rental price per day', example: 49.90 })
  pricePerDay: number;

  @ApiProperty({ description: 'URL of the main photo of the product', required: false, readOnly: true })
  mainPhoto?: string;

  @ApiHideProperty()
  user?: UserEntity;
}