import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../entities/user.entity';
import { CreateUserDTO } from '../dto/create-user.dto';
import { LoginUserDTO } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {

    @InjectRepository(User)
    private readonly userRepository: Repository<User>

    constructor(private readonly jwtService: JwtService) {}

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
    
        const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
        const user = this.userRepository.create({ ...createUserDTO, password: hashedPassword });
        return this.userRepository.save(user);
    }

    async login(loginUserDTO: LoginUserDTO) {
        const { cpf, password } = loginUserDTO;
    
        const user = await this.userRepository.findOne({ where: { cpf } });
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
    
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }
    
        const payload = { id: user.id, name: user.name, cpf: user.cpf };
        const token = this.jwtService.sign(payload);
    
        return { token };
    }

}
