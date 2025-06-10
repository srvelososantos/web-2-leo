import { Type } from "class-transformer"
import { IsDate, IsEnum, IsNumber } from "class-validator"
import { Status } from "src/enums/status.enum"


export class CreateInscriptionDto {

    @IsDate()
    @Type(() => Date)
    dt_inscription: Date

    @IsEnum(Status)
    status: Status

    @IsNumber()
    userid: number

}
