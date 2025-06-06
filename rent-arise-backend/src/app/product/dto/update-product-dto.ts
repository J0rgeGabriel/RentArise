import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateProductDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Updated name of the product', required: false })
    name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Updated description of the product', required: false })
    description?: string;

    @IsOptional()
    @IsNumber({}, { message: 'Price must be a number' })
    @IsPositive({ message: 'Price must be a positive number' })
    @ApiProperty({ description: 'Updated rental price per day', example: 49.90, required: false })
    pricePerDay?: number;
}