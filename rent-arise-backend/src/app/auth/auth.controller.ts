import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../user/dto/create-user-dto";
import { LoginDto } from "./dto/login-dto";
import { DocLogin, DocRegister } from "./docs/auth.docs";

@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @DocRegister()
    async register(@Body() body: CreateUserDto){
        return await this.authService.signUp(body);
    }

    @Post('/login')
    @DocLogin()
    async login(@Body() body: LoginDto){
        return await this.authService.signIn(body);
    }
}