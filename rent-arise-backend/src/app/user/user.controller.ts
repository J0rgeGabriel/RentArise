import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'List all users.'})
    @ApiResponse({ status: 200, description: 'List of users'})
    async index() {
        return await this.userService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user.'})
    @ApiResponse({ status: 201, description: 'User successfully created!'})
    @ApiResponse({ status: 400, description: 'Invalid parameters.'})
    async create(@Body() body: CreateUserDto){
        return await this.userService.create(body);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Returns user data.'})
    @ApiResponse({ status: 200, description: 'User data successfully returned.'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    async show(@Param('id', new ParseUUIDPipe()) id: string){
        return await this.userService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Updtate a user by id.'})
    @ApiResponse({ status: 200, description: 'User updated successfully".'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
        return await this.userService.update(id, body);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a user by id.'})
    @ApiResponse({ status: 204, description: 'User removed successfully".'})
    @ApiResponse({ status: 404, description: 'User not found.'})
    async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
        await this.userService.deleteById(id);
    }
}
