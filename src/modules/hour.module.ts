import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hour } from './../entities/hour.entity';
import { User } from './../entities/user.entity';
import { HourService } from './../service/hour.service';

@Module({
    imports: [TypeOrmModule.forFeature([Hour, User])],
    providers: [HourService],
    exports: [HourService],
})
export class HourModule {}
