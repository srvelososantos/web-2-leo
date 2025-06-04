import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { Inscriptions } from './../../inscription/entities/inscription.entity'
import { Session } from "src/sessions/entities/session.entity";

@Entity()
@TableInheritance({ column: { type:'varchar', name: 'type' } })
export abstract class User{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    type: string;

    @OneToMany(() => Inscriptions, (inscription) => inscription.user)
    inscriptions: Inscriptions[];

    @ManyToMany(() => Session, session => session.user, { onDelete: 'CASCADE' })
    sessionn: Session;
}