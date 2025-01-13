import { IsString } from 'class-validator';

export class LoginUserDTO {
    @IsString()
    readonly cpf: string;

    @IsString()
    readonly password: string;
}
