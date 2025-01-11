import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './../entities/user.entity';
import { Hour } from './../entities/hour.entity';
import { UsersService } from './../service/user.service';
import { UsersController } from './../controller/user.controller';

@Module({
    imports: [TypeOrmModule.forFeature([User, Hour])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
