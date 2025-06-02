import { IsNumber, IsString } from 'class-validator'
import { Inscriptions } from '../../inscription/entities/inscription.entity'

export class CreateEventDto {

    @IsString()
    readonly name: string

    @IsString()
    readonly description: string

    @IsString()
    readonly local: string

    @IsString()
    readonly link: string

    @IsNumber()
    readonly max_cap: number

}
