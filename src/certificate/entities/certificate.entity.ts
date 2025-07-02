import { Session } from "src/sessions/entities/session.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Certificate {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    val_code: string

    @ManyToOne(() => User, (user) => user.certificates)
    user: User

    @ManyToOne(() => Session, session => session.certificates, { eager: true })
    event_session: Session

    @Column()
    em_date: Date

    @Column()
    revoked: boolean
}
