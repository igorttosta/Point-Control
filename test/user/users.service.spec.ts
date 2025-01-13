import { CreateUserDTO } from './../../src/dto/create-user.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/service/user.service';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Hour } from 'src/entities/hour.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: Repository<User>;
    let jwtService: JwtService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(() => 'mockJwtToken'), // Mock do método sign
                    },
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
        jwtService = module.get<JwtService>(JwtService);
    });

    describe('findOne', () => {
        it('should return a user if found', async () => {
            const mockHour = {
                id: '1',
                relevant_day: new Date(),
                started_at: new Date(),
                paused_at: null,
                ended_at: null,
                user: null,
            } as Hour;

            const mockUser = {
                id: '1',
                name: 'John Doe',
                cpf: '12345678900',
                password: 'password',
                hour: [mockHour],
                created_at: new Date(),
                updated_at: new Date(),
                generetadId: () => {},
            } as unknown as User;

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as User);

            const user = await service.findOne('1');
            expect(user).toEqual(mockUser);
        });

        it('should throw NotFoundException if user is not found', async () => {
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

            await expect(service.findOne('1')).rejects.toThrow(
                new NotFoundException('User ID 1 not found'),
            );
        });
    });

    describe('create', () => {
        it('should create and return a user if CPF does not exist', async () => {
            const createUserDTO: CreateUserDTO = {
                name: 'John Doe',
                cpf: '12345678900',
                password: 'password',
            };

            const mockUser = { id: '1', ...createUserDTO };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null); // No existing user
            jest.spyOn(userRepository, 'create').mockReturnValue(mockUser as User);
            jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser as User);

            const user = await service.create(createUserDTO);
            expect(user).toEqual(mockUser);
        });

        it('should throw BadRequestException if CPF already exists', async () => {
            const createUserDTO: CreateUserDTO = {
                name: 'John Doe',
                cpf: '12345678900',
                password: 'password',
            };

            const existingUser = { id: '1', ...createUserDTO };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(existingUser as User);

            await expect(service.create(createUserDTO)).rejects.toThrow(
                new BadRequestException('A user with this CPF already exists.'),
            );
        });
    });

    describe('login', () => {
        it('should return a token for valid credentials', async () => {
            const loginUserDTO = {
                cpf: '12345678900',
                password: 'password',
            };

            const mockUser = {
                id: '1',
                name: 'John Doe',
                cpf: '12345678900',
                password: await bcrypt.hash('password', 10),
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as User);
            jest.mock('bcrypt', () => ({compare: jest.fn(),hash: jest.fn(),}));

            const result = await service.login(loginUserDTO);

            expect(result).toEqual({ token: 'mockJwtToken' });
            expect(jwtService.sign).toHaveBeenCalledWith({
                id: mockUser.id,
                name: mockUser.name,
                cpf: mockUser.cpf,
            });
        });

        it('should throw BadRequestException if user is not found', async () => {
            const loginUserDTO = {
                cpf: 'invalidCpf',
                password: 'password',
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

            await expect(service.login(loginUserDTO)).rejects.toThrow(
                new BadRequestException('Invalid credentials'),
            );
        });

        it('should throw BadRequestException for invalid password', async () => {
            const loginUserDTO = {
                cpf: '12345678900',
                password: 'wrongPassword',
            };

            const mockUser = {
                id: '1',
                name: 'John Doe',
                cpf: '12345678900',
                password: await bcrypt.hash('correctPassword', 10),
            };

            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as User);
            jest.mock('bcrypt', () => ({compare: jest.fn(),hash: jest.fn(),}));

            await expect(service.login(loginUserDTO)).rejects.toThrow(
                new BadRequestException('Invalid credentials'),
            );
        });
    });
});
