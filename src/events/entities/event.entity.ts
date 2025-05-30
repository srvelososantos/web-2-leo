import { Column, Entity, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Inscriptions } from '../../inscription/entities/inscription.entity'
import { Session } from "src/sessions/entities/session.entity";


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

    // Um evento pode ter várias sessões
    @OneToMany(() => Session, session => session.eventt, { cascade: true })
    sessions: Session[];
}
