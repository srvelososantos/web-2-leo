import { ChildEntity, Column } from "typeorm";
import { User } from '../entities/user.entity'

@ChildEntity()
export class Palestrante extends User{

    @Column()
    curricul_lattes: string;

}