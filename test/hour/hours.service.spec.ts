import { CreateHourDTO } from './../../src/dto/create-hour.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { HourService } from 'src/service/hour.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Hour } from 'src/entities/hour.entity';
import { User } from 'src/entities/user.entity';
import { BadRequestException } from '@nestjs/common';

describe('HourService', () => {
    let hourService: HourService;
    let hourRepository: Repository<Hour>;
    let userRepository: Repository<User>;

    const mockHourRepository = {
        findOne: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
    };

    const mockUserRepository = {
        findOne: jest.fn(),
    };
    
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
            HourService,
            {
                provide: getRepositoryToken(Hour),
                useValue: mockHourRepository,
            },
            {
                provide: getRepositoryToken(User),
                useValue: mockUserRepository,
            },
            ],
        }).compile();

        hourService = module.get<HourService>(HourService);
        hourRepository = module.get<Repository<Hour>>(getRepositoryToken(Hour));
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });
    
        afterEach(() => {
        jest.clearAllMocks();
        });
    
        describe('create', () => {
        it('should throw BadRequestException if user is not found', async () => {
            mockUserRepository.findOne.mockResolvedValue(null);
    
            const createHourDTO: CreateHourDTO = { relevant_day: new Date() };
    
            await expect(hourService.create('invalid-user-id', createHourDTO)).rejects.toThrow(
            BadRequestException,
            );
            expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { id: 'invalid-user-id' } });
        });
    
        it('should throw BadRequestException if an hour entry already exists and is ended', async () => {
            const createHourDTO: CreateHourDTO = { relevant_day: new Date() };
            mockUserRepository.findOne.mockResolvedValue({ id: 'user-id' });
            mockHourRepository.findOne.mockResolvedValue({ ended_at: new Date() });
    
            await expect(hourService.create('user-id', createHourDTO)).rejects.toThrow(
            BadRequestException,
            );
        });
    
        it('should create and save a new hour entry', async () => {
            const createHourDTO: CreateHourDTO = { relevant_day: new Date() };
            const user = { id: 'user-id' };
            const hour = { id: 'hour-id', ...createHourDTO, user };
    
            mockUserRepository.findOne.mockResolvedValue(user);
            mockHourRepository.findOne.mockResolvedValue(null);
            mockHourRepository.create.mockReturnValue(hour);
            mockHourRepository.save.mockResolvedValue(hour);
    
            const result = await hourService.create('user-id', createHourDTO);
    
            expect(result).toEqual(hour);
            expect(mockHourRepository.create).toHaveBeenCalledWith({ ...createHourDTO, user });
            expect(mockHourRepository.save).toHaveBeenCalledWith(hour);
        });
        });
    
        describe('update', () => {
        it('should throw BadRequestException if no hour entry is found', async () => {
            mockHourRepository.findOne.mockResolvedValue(null);
    
            await expect(hourService.update('user-id', new Date(), {})).rejects.toThrow(
            BadRequestException,
            );
        });
    
        it('should throw BadRequestException if an invalid field is being updated', async () => {
            const hour = { id: 'hour-id', ended_at: null };
            mockHourRepository.findOne.mockResolvedValue(hour);
    
            await expect(
                hourService.update('user-id', new Date(), { invalidField: 'value' } as any),
            ).rejects.toThrow(BadRequestException);
        });
    
        it('should throw BadRequestException if hour entry is already ended', async () => {
            const hour = { id: 'hour-id', ended_at: new Date() };
            mockHourRepository.findOne.mockResolvedValue(hour);
    
            await expect(
            hourService.update('user-id', new Date(), { ended_at: new Date() }),
            ).rejects.toThrow(BadRequestException);
        });
    
        it('should update and save the hour entry', async () => {
            const hour = { id: 'hour-id', ended_at: null };
            const updates = { started_at: new Date() };
    
            mockHourRepository.findOne.mockResolvedValue(hour);
            mockHourRepository.save.mockResolvedValue({ ...hour, ...updates });
    
            const result = await hourService.update('user-id', new Date(), updates);
    
            expect(result).toEqual({ ...hour, ...updates });
            expect(mockHourRepository.save).toHaveBeenCalledWith({ ...hour, ...updates });
        });
        });
});