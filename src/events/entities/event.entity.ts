import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

@Entity()
export class Event {

    @Column()
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
}
