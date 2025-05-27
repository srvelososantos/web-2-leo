import { Inscriptions } from '../../inscription/entities/inscription.entity'

export class CreateEventDto {
    
    readonly id?: number
    readonly name: string
    readonly description: string
    readonly local: string
    readonly link: string
    readonly max_cap: number
    readonly inscriptions?: Inscriptions[];
}
