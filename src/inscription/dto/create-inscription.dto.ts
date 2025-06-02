import { Status } from "src/enums/status.enum"
import { User } from "src/users/entities/user.entity"

export class CreateInscriptionDto {

    
    readonly user: User
    
    readonly event: Event

    readonly dt_inscription: Date

    readonly status: Status

}
