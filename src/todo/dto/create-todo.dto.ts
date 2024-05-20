import { IsBoolean, IsNumber, IsOptional, IsString, MinLength } from "class-validator";
import { IsNull } from "typeorm";

export class CreateTodoDto {
    @IsString()
    @MinLength(4)
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
