import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Certificate {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    val_code: string

    @Column()
    user_name: string

    @Column()
    event_session_name: string

    @Column()
    em_date: Date
}
