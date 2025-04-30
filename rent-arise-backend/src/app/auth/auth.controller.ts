import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/CreateUserDto";
import { LoginDto } from "./dto/LoginDto";

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    async register(@Body() body: CreateUserDto){
        return await this.authService.signUp(body);
    }

    @Post('/login')
    async login(@Body() body: LoginDto){
        return await this.authService.signIn(body);
    }
}