import { ChildEntity, Column } from "typeorm";
import { User } from './user.entity'

@ChildEntity()
export class Participant extends User{

    @Column()
    data_inscricao: Date;

}