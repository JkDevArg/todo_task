import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";
import { IsNull } from "typeorm";

export class CreateTodoDto {
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    color: string;

    @IsNumber()
    @IsOptional()
    order: number;

    @IsBoolean()
    @IsOptional()
    status: boolean;
}
