import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './../entities/user.entity';
import { Hour } from './../entities/hour.entity';
import { UsersService } from './../service/user.service';
import { UsersController } from './../controller/user.controller';
import { AuthModule } from './login.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, Hour]), AuthModule],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}
