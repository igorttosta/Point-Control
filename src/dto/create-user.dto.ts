import { IsString } from 'class-validator';

export class CreateUserDTO {
    @IsString()
    readonly name: string;

    @IsString()
    readonly cpf: string;

    @IsString()
    readonly password: string;
}