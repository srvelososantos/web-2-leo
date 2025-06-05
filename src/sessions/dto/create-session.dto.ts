import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateSessionDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsNumber()
    duration: number;

    @IsBoolean()
    lecture: boolean;

    @IsNumber()
    course_max_cap: number;

}
