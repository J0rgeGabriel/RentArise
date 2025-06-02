import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ) {}

    async create(createDto: CreateUserDto): Promise<UserEntity> {
        return await this.userRepository.save(this.userRepository.create(createDto));
    }

    async findOne(id: string): Promise<Omit<UserEntity, 'password'>> {
        try {
            const user = await this.userRepository.findOneOrFail({ where: { id } });

            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        } catch {
            throw new NotFoundException('User not found.');
        }
    }

    async findAll(): Promise<Partial<UserEntity>[]> {
        return this.userRepository.find({
            select: ['id', 'fullname', 'username', 'email', 'cpf', 'role', 'createdAt'],
        });
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ where: { username } });
    }
      
    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async update(id: string, updateDto: UpdateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOneOrFail({ where: { id } });

        this.userRepository.merge(user, updateDto);
        return await this.userRepository.save(user);
    }

    async deleteById(id: string) {
        const user = await this.findOne(id);
        
        await this.userRepository.softDelete(id);
    }
}
