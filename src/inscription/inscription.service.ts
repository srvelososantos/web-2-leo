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


  ){  }

  async signupOtherSessions(insc_id: number, signupOtherSessions: signupOtherSessions) {

    const session = await this.sessionsRepository.findOne({where: { id: signupOtherSessions.idSession }})
    if(!session) throw new HttpException('Session not found!', HttpStatus.NOT_FOUND)
      
      console.log(insc_id)
    // http 500. .....
    const inscription = await this.inscriptionsRepository.findOne({where: { id: insc_id }})
    if(!inscription) throw new HttpException('Inscription not found!', HttpStatus.NOT_FOUND)

    const userinscript = this.inscriptionsRepository.findOne({ where: { user: { id: inscription.user.id }, event: { id: session.eventt.id } } })
    if(!userinscript) throw new HttpException('User is not subscribed in the event', HttpStatus.NOT_FOUND)

    await this.sessionsRepository.createQueryBuilder().relation(User, 'sessionn').of(inscription.user.id).add(session.id)
  }
 
  findAll() {
    return `This action returns all inscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} inscription`;
  }

  update(id: number, updateInscriptionDto: UpdateInscriptionDto) {
    return `This action updates a #${id} inscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} inscription`;
  }
}
