import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @ApiProperty()
    fullname?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    username?: string;
  
    @IsOptional()
    @IsEmail()
    @ApiProperty()
    email?: string;
  
    @IsOptional()
    @MinLength(6)
    @ApiProperty()
    password?: string;
}