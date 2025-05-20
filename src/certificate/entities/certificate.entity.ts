import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity()
export class Certificate {

    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'uuid', unique: true, default: () => 'uuid_generate_v4()' })
    val_code: string

    @Column()
    user_name: string

    @Column()
    event_session_name: string

    @Column()
    em_date: Date
}
