import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateSessionDto {

    @ApiProperty({ example: 'palestra sobre bancos de dados' }) 
    @IsString()
    title: string;

    @ApiProperty({ example: 'palestra sobre diferentes tipos de bancos de dados' }) 
    @IsString()
    description: string;

    @ApiProperty({ example: '60' }) 
    @IsNumber()
    duration: number;

    @ApiProperty({ example: 'true' }) 
    @IsBoolean()
    lecture: boolean;

    @ApiProperty({ example: '0' }) 
    @IsNumber()
    course_max_cap: number;

}
