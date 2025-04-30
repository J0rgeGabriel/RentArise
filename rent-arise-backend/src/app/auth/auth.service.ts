import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { CreateUserDto } from "../user/dto/CreateUserDto";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { UserEntity } from "../user/entity/user.entity";
import { LoginDto } from "./dto/LoginDto";

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
        if (await this.userService.findByEmail(createUserDto.email)) {
            throw new BadRequestException('Email already in use');
        }
    
        if (await this.userService.findByUsername(createUserDto.username)) {
            throw new BadRequestException('Username already in use');
        }
    
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
        const newUser = await this.userService.create({
            ...createUserDto,
            password: hashedPassword,
        });
    
        const { password: _, ...userWithoutPassword } = newUser;
        return userWithoutPassword;
    }

    async signIn(loginDto: LoginDto): Promise<Omit<UserEntity, 'password'> & { access_token: string }> {
        const user = loginDto.email
            ? await this.userService.findByEmail(loginDto.email)
            : await this.userService.findByUsername(loginDto.username!);
    
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
    
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }
    
        const access_token = await this.jwtService.signAsync({
            sub: user.id,
            username: user.email,
        });
    
        const { password: _, ...userWithoutPassword } = user;
        return { ...userWithoutPassword, access_token };
    }
}