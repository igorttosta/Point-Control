import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from '../service/user.service'
import { CreateUserDTO } from '../dto/create-user.dto'
import { LoginUserDTO } from '../dto/login-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.usersService.findOne(id)
    }

    @Post()
    create(@Body() CreateUserDTO: CreateUserDTO) {
        return this.usersService.create(CreateUserDTO)
    }

    @Post('login')
    async login(@Body() loginUserDTO: LoginUserDTO) {
        return this.usersService.login(loginUserDTO);
    }
}
