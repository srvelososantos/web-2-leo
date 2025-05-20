import { User } from "src/users/entities/user.entity";
import { Event } from "src/events/entities/event.entity"
import { Status } from "src/enums/status.enum"
import { Column, Entity, ListCollectionsCursor, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Inscriptions{

    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    user: User

    @Column()
    event: Event

    @Column()
    dt_inscription: Date

    @Column({
        type: 'enum',
        enum: Status,
    })
    status: Status
}