import { ChildEntity, Column } from "typeorm";
import { User } from './user.entity';

@ChildEntity()
export class Organizer extends User{

    @Column()
    nivel_acesso: string;

}