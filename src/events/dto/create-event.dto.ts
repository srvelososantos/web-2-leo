import { IsNumber, IsString } from 'class-validator'
import { Inscriptions } from '../../inscription/entities/inscription.entity'

export class CreateEventDto {

    @IsString()
    name: string

    @IsString()
    description: string

    @IsString()
    local: string

    @IsString()
    link: string

    @IsNumber()
    max_cap: number

}
