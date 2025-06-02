import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty({ description: 'URL of the main photo of the product', required: false, readOnly: true })
  mainPhoto?: string;

  @ApiHideProperty()
  user?: UserEntity;
}