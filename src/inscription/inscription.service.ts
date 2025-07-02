import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inscriptions } from './entities/inscription.entity';
import { Repository } from 'typeorm';
import { Session } from 'src/sessions/entities/session.entity';
import { User } from 'src/users/entities/user.entity';
import { signupOtherSessions } from './dto/signupOtherSessions.dto';

@Injectable()
export class InscriptionService {

  constructor(
    @InjectRepository(Inscriptions)
        private readonly inscriptionsRepository: Repository<Inscriptions>,

    @InjectRepository(Session)
        private readonly sessionsRepository: Repository<Session>,
    
    @InjectRepository(User)
        private readonly usersRepository: Repository<User>,


  ){  }

  async signupOtherSessions(insc_id: number, signupOtherSessions: signupOtherSessions, req: any) {

    const session = await this.sessionsRepository.findOne(
      { where: { id: signupOtherSessions.idSession }, relations: ['eventt'] }
    )
    if(!session) throw new HttpException('Session not found!', HttpStatus.NOT_FOUND)
      
    const inscription = await this.inscriptionsRepository.findOne(
      {where: { id: insc_id }, relations: ['user', 'event']}
    )
    if(!inscription) throw new HttpException('Inscription not found!', HttpStatus.NOT_FOUND)

    const userinscript = await this.inscriptionsRepository.findOne(
      { where: { user: { id: req.sub }, event: { id: session.eventt.id } } }
    )
    if(!userinscript) throw new HttpException('User is not subscribed in the event', HttpStatus.CONFLICT)

    try{
      
      return await this.sessionsRepository.createQueryBuilder().relation(User, 'sessionn').of(inscription.user.id).add(session.id)
    }catch(e){
      throw new HttpException('User is alredy subscribed in the Session', HttpStatus.CONFLICT)
    }
  }

  async remove(insc_id: number) {

    const insc = await this.inscriptionsRepository.findOne({ where: { id: insc_id }, relations: ['user', 'event'] })
    if (!insc) {
      throw new HttpException('Inscription not found', HttpStatus.NOT_FOUND);
    }

    try{
      const sessions_ids = await this.sessionsRepository.find({
        where: { eventt: { id: insc.event.id } }
      })

      const sessions = await sessions_ids.map((session) => session.id)
    
      await this.usersRepository.createQueryBuilder().relation(User, 'sessionn').of(insc.user.id).remove(sessions)
      
      await this.inscriptionsRepository.delete(insc_id)

      return { message: 'Sessions removed from user successfully' }
    }catch(e){
      throw new HttpException('Cannot remove inscription and sessions from this user', HttpStatus.NOT_FOUND)
    }
  }
}
