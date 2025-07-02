import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsDate, IsEnum, IsNumber } from "class-validator"
import { Status } from "src/enums/status.enum"


export class CreateInscriptionDto {

    @ApiProperty({ example: '2021-12-05' })
    @IsDate()
    @Type(() => Date)
    dt_inscription: Date

    @ApiProperty({ example: 'ok' })
    @IsEnum(Status)
    status: Status

}
