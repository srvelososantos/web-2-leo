import { IsNumber } from "class-validator";

export class signupOtherSessions{

    @IsNumber()
    idSession: number

    @IsNumber()
    userid: number
}