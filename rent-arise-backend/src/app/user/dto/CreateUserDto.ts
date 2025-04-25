import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { Role } from "../enums/role.enum";
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @IsNotEmpty({ message: 'O nome completo é obrigatório' })
    @IsString()
    @ApiProperty()
    fullname: string;

    @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
    @IsString()
    @ApiProperty()
    username: string;

    @IsNotEmpty({ message: 'O email é obrigatório' })
    @IsEmail({}, { message: 'Email inválido' })
    @ApiProperty()
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    @ApiProperty()
    password: string;

    @IsNotEmpty({ message: 'O CPF é obrigatório' })
    @Matches(/^\d{11}$/, { message: 'O CPF deve conter 11 dígitos numéricos' })
    @ApiProperty()
    cpf: string;

    @IsNotEmpty({ message: 'O papel do usuário é obrigatório' })
    @IsEnum(Role, { message: 'O papel deve ser um valor válido' })
    @ApiProperty()
    role: Role;
}