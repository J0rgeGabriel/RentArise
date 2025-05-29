import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from "src/app/user/entity/user.entity";

export class CreateProductDto {

    @IsNotEmpty({ message: 'Name of product is required' })
    @IsString()
    @ApiProperty()
    name: string;

    description: string;

    mainPhoto?: string;
    
    user?: UserEntity
}