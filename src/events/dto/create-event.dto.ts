import { IsNumber, IsString } from 'class-validator'
import { Inscriptions } from '../../inscription/entities/inscription.entity'
import { ApiProperty } from '@nestjs/swagger'

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
}
