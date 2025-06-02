import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { Role } from "../enums/role.enum";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Full name is required' })
  @IsString()
  @ApiProperty({ description: 'Full name of the user', example: 'Pedro Augusto Ribeiro' })
  fullname: string;

  @IsNotEmpty({ message: 'Username is required' })
  @IsString()
  @ApiProperty({ description: 'Unique username for the user', example: 'pedroaugusto' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  @ApiProperty({ description: 'Valid email address of the user', example: 'pedro@example.com' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty({ description: 'Password with at least 6 characters', example: '123456' })
  password: string;

  @IsNotEmpty({ message: 'CPF is required' })
  @Matches(/^\d{11}$/, { message: 'CPF must contain exactly 11 numeric digits' })
  @ApiProperty({ description: 'CPF of the user (only numbers)', example: '12345678901' })
  cpf: string;

  @IsNotEmpty({ message: 'User role is required' })
  @IsEnum(Role, { message: 'Role must be a valid value' })
  @ApiProperty({ description: 'Role assigned to the user', enum: Role, example: Role.USER })
  role: Role;
}