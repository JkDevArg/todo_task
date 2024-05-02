import { IsString } from "class-validator";

export class CreatePersonDto {
    @IsString()
    name: string;

    @IsString()
    profession: string;

    @IsString()
    attribute: string;
}
