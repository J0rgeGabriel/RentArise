import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

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
}