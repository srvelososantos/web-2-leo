import { ChildEntity, Column } from "typeorm";
import { User } from '../entities/user.entity'

@ChildEntity()
export class Participante extends User{

    @Column()
    data_inscricao: Date;

}