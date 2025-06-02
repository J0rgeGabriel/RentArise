import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user-dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../authorization/roles/roles.decorator';
import { Role } from './enums/role.enum';
import { RolesGuard } from '../authorization/roles/roles.guard';
import { DocDeleteUser, DocGetAllUsers, DocShowUser, DocUpdateUser } from './docs/user.docs';

@Controller('api/users')
@ApiTags('Users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @DocGetAllUsers()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    @DocShowUser()
    @UseGuards(JwtAuthGuard)
    async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
        return await this.userService.findOne(id);
    }

    @Put(':id')
    @DocUpdateUser()
    @UseGuards(JwtAuthGuard)
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @DocDeleteUser()
    @UseGuards(JwtAuthGuard)
    async delete(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.userService.deleteById(id);
    }
}
