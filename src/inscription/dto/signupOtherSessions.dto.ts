import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class signupOtherSessions{

    @ApiProperty({ example: '2' })
    @IsNumber()
    idSession: number
}