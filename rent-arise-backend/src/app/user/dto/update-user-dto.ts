import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { IsEmail, IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Full name of the user.' })
  fullname?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'Unique username for login.' })
  username?: string;
  
  @IsOptional()
  @IsEmail()
  @ApiProperty({ description: 'Valid email address.' })
  email?: string;
  
  @IsOptional()
  @MinLength(6)
  @ApiProperty({ description: 'Password with minimum 6 characters.' })
  password?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({ description: 'URL or path to the profile icon image.' })
  profileIconUrl?: string;
}