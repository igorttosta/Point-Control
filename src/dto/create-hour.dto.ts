import { IsString, IsDate, IsOptional } from 'class-validator';

export class CreateHourDTO {
    @IsDate()
    readonly relevant_day: Date;

    @IsOptional()
    @IsDate()
    readonly started_at?: Date;

    @IsOptional()
    @IsDate()
    readonly pauseded_at?: Date;

    @IsOptional()
    @IsDate()
    readonly returned_at?: Date;

    @IsOptional()
    @IsDate()
    readonly ended_at?: Date;

    @IsOptional()
    @IsString()
    readonly totalHours?: string;
}