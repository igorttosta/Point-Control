import { Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Hour } from './../entities/hour.entity';
import { User } from './../entities/user.entity';
import { CreateHourDTO } from '../dto/create-hour.dto';

@Injectable()
export class HourService {
    @InjectRepository(Hour)
    private readonly hourRepository: Repository<Hour>;

    @InjectRepository(User)
    private readonly userRepository: Repository<User>;

    async create(userId: string, createHourDTO: CreateHourDTO) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new BadRequestException('User not found');
        }

        const existingHour = await this.hourRepository.findOne({
            where: {
                user: { id: userId },
                relevant_day: createHourDTO.relevant_day,
            },
        });

        if (existingHour && createHourDTO.ended_at) {
            throw new BadRequestException('An hour entry already exists for this user on this day');
        }

        const hour = this.hourRepository.create({ ...createHourDTO, user });
        return this.hourRepository.save(hour);
    }

    async update(userId: string, relevant_day: Date, updates: Partial<Hour>) {
        const hour = await this.hourRepository.findOne({
            where: {
                user: { id: userId },
                relevant_day,
            },
        });

        if (!hour) {
            throw new BadRequestException('No hour entry found for this user on this day');
        }

        Object.assign(hour, updates);
        return this.hourRepository.save(hour);
    }
}
