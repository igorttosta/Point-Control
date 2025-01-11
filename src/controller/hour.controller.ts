import { Body, Controller, Param, Post, Put, BadRequestException } from '@nestjs/common';
import { HourService } from '../service/hour.service';
import { CreateHourDTO } from '../dto/create-hour.dto';

@Controller('hours')
export class HourController {
    constructor(private readonly hourService: HourService) {}

    @Post(':userId')
        async createHour(@Param('userId') userId: string, @Body() createHourDTO: CreateHourDTO) {
        try {
            return await this.hourService.create(userId, createHourDTO);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Put(':userId/:relevant_day')
    async updateHour(
        @Param('userId') userId: string,
        @Param('relevant_day') relevantDay: string,
        @Body() updates: Partial<CreateHourDTO>,
    ) {
        try {
        const relevantDayDate = new Date(relevantDay);
        if (isNaN(relevantDayDate.getTime())) {
            throw new BadRequestException('Invalid date format for relevant_day.');
        }
        return await this.hourService.update(userId, relevantDayDate, updates);
        } catch (error) {
        throw new BadRequestException(error.message);
        }
    }
}
