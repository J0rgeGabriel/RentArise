import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { Role } from "../enums/role.enum";

export class CreateUserDto {
    @IsNotEmpty({ message: 'O nome completo é obrigatório' })
    @IsString()
    fullname: string;

    @IsNotEmpty({ message: 'O nome de usuário é obrigatório' })
    @IsString()
    username: string;

    @IsNotEmpty({ message: 'O email é obrigatório' })
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória' })
    @MinLength(6, { message: 'A senha deve ter pelo menos 6 caracteres' })
    password: string;

    @IsNotEmpty({ message: 'O CPF é obrigatório' })
    @Matches(/^\d{11}$/, { message: 'O CPF deve conter 11 dígitos numéricos' })
    cpf: string;

    @IsNotEmpty({ message: 'O papel do usuário é obrigatório' })
    @IsEnum(Role, { message: 'O papel deve ser um valor válido' })
    role: Role;
}