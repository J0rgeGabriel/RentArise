import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    fullname?: string;

    @IsOptional()
    @IsString()
    username?: string;
  
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @IsOptional()
    @MinLength(6)
    password?: string;
}