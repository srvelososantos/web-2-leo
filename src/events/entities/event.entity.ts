import { Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Inscriptions } from '../../inscription/entities/inscription.entity'

@Entity()
export class Event {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    local: string

    @Column()
    link: string
    
    @Column()
    max_cap: number

    @OneToMany(() => Inscriptions, (inscription) => inscription.event)
    inscriptions: Inscriptions[];
}
