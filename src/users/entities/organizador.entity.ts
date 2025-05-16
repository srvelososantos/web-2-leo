import { ChildEntity, Column } from "typeorm";
import { User } from '../entities/user.entity';

@ChildEntity()
export class Organizador extends User{

    @Column()
    nivel_acesso: string;

}