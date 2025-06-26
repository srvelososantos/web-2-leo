import { Column, Entity, IsNull, ManyToOne, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Inscriptions } from '../../inscription/entities/inscription.entity'
import { Session } from "src/sessions/entities/session.entity";
import { User } from "src/users/entities/user.entity";


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

    @ManyToOne(() => User, user => user.events)
    user: User
    
    @Column()
    dt_ini: Date

    @Column()
    dt_fin: Date

    @Column()
    certificatesGenerated: boolean
}
