import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class LoginDto {
    @ApiPropertyOptional({ description: 'User email' })
    @ValidateIf((o) => !o.username)
    @IsEmail({}, { message: 'Invalid email format' })
    email?: string;
  
    @ApiPropertyOptional({ description: 'Username' })
    @ValidateIf((o) => !o.email)
    @IsString({ message: 'Username must be a string' })
    username?: string;
  
    @ApiProperty({ description: 'User password' })
    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
