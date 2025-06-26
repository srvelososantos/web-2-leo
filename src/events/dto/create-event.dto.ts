import { IsDate, IsNumber, IsString } from 'class-validator'
import { Inscriptions } from '../../inscription/entities/inscription.entity'
import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'

export class CreateEventDto {

    @ApiProperty({ example: 'Evento de tecnologia' }) 
    @IsString()
    name: string

    @ApiProperty({ example: 'Evento para discussão sobre tecnologias' })
    @IsString()
    description: string

    @ApiProperty({ example: 'Anfiteatro da UFMS' })
    @IsString()
    local: string

    @ApiProperty({ example: 'ufms.evento.br' })
    @IsString()
    link: string

    @ApiProperty({ example: '200' })
    @IsNumber()
    max_cap: number

    @ApiProperty({ example: '6' })
    @IsNumber()
    userid: number

    @ApiProperty({ example: '2021-12-06' })
    @IsDate()
    @Type(() => Date)
    dt_ini: Date

    @ApiProperty({ example: '2021-12-06' })
    @IsDate()
    @Type(() => Date)
    dt_fin: Date
}
