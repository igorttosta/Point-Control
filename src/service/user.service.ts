import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';

@Injectable()
export class UsersService {

    @InjectRepository(User)
    private readonly userRepository: Repository<User>

    async findOne(id: string) {
        const user = await this.userRepository.findOne({
            where: { id },
                relations: ['hour'],
            });
            if (!user) {
                throw new NotFoundException(`User ID ${id} not found`);
            }
        return user;
    }

    async create(createUserDTO: CreateUserDTO) {
        const existingUser = await this.userRepository.findOne({
            where: { cpf: createUserDTO.cpf },
        });
    
        if (existingUser) {
            throw new BadRequestException('A user with this CPF already exists.');
        }
    
        const user = this.userRepository.create(createUserDTO);
        return this.userRepository.save(user);
    }

}
