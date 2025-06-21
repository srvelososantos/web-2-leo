import { ChildEntity, Column } from "typeorm";
import { User } from './user.entity'

@ChildEntity()
export class Speaker extends User{

    @Column()
    curricul_lattes: string;

}