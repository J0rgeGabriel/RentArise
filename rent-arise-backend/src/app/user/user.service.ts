import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dtos/CreateUserDto';
import { UpdateUserDto } from './dtos/UpdateUserDto';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create(createDto: CreateUserDto) {
        return await this.userRepository.save(this.userRepository.create(createDto));
    }

    async findOne(id: string) {
        try {
            return await this.userRepository.findOneOrFail({ where: { id } });
        } catch (error){
            throw new NotFoundException(error.message);
        }
    }

    async findAll() {
        return await this.userRepository.find();
    }

    async update(id: string, updateDto: UpdateUserDto) {
        const user = await this.findOne(id);

        this.userRepository.merge(user, updateDto);
        return await this.userRepository.save(user);
    }

    async deleteById(id: string) {
        await this.findOne(id);
        await this.userRepository.delete(id);
    }
}
