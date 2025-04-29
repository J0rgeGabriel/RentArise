import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { Role } from "../enums/role.enum";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Full name is required' })
    @IsString()
    @ApiProperty()
    fullname: string;

    @IsNotEmpty({ message: 'Username is required' })
    @IsString()
    @ApiProperty()
    username: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Invalid email' })
    @ApiProperty()
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @ApiProperty()
    password: string;

    @IsNotEmpty({ message: 'CPF is required' })
    @Matches(/^\d{11}$/, { message: 'CPF must contain exactly 11 numeric digits' })
    @ApiProperty()
    cpf: string;

    @IsNotEmpty({ message: 'User role is required' })
    @IsEnum(Role, { message: 'Role must be a valid value' })
    @ApiProperty()
    role: Role;
}