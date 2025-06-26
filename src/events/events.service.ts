import { ConflictException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { DataSource, LessThanOrEqual, Repository } from 'typeorm';
import { Inscriptions } from 'src/inscription/entities/inscription.entity';
import { CreateInscriptionDto } from 'src/inscription/dto/create-inscription.dto';
import { User } from 'src/users/entities/user.entity';
import { Session } from 'src/sessions/entities/session.entity';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,

    @InjectRepository(Inscriptions)
    private readonly inscriptionsRepository: Repository<Inscriptions>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,

  ) {}

  async create(createEventDto: CreateEventDto) {

    const user = await this.usersRepository.findOne({ where: { id: createEventDto.userid } })
    if(!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND)

    const createdEvent = await this.eventsRepository.create({
      ...createEventDto,
      user: user, //usuario logado
      certificatesGenerated: false
    });

    await this.eventsRepository.save(createdEvent)
    return createdEvent;
  }

  async findAll(): Promise<Event[]> {
    const events = await this.eventsRepository.find()
    if(events.length === 0) throw new HttpException('Events not found', HttpStatus.NOT_FOUND)
    return events;
  }

  async findOne(id: number): Promise<Event | null> {
    const event = await this.eventsRepository.findOne({
      where: { id }
    })
    if(!event) throw new HttpException('Event Not Found!', HttpStatus.NOT_FOUND)
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.eventsRepository.findOne({
      where: { id }
    })
    if(!event) throw new HttpException('Event not found!', HttpStatus.NOT_FOUND)
    
    Object.assign(event, updateEventDto)
    return this.eventsRepository.save(event);
  }

  async markAsWithCertificates(eventId: number): Promise<void> {
  await this.eventsRepository.update(eventId, { certificatesGenerated: true });
}

  async remove(id: number) {
    const event = await this.eventsRepository.findOne({where: { id }})
    if(!event) throw new HttpException('Event not found!', HttpStatus.NOT_FOUND)
    console.log("teste")
    console.log(event)
    console.log(id)
    try{
      await this.eventsRepository.delete(id)
      return event
    }catch(e){
      throw new HttpException('Cannot delete event', HttpStatus.NOT_FOUND)
    }
  }

  async participants(id_event: number){
    const event = await this.eventsRepository.findOne({ where: {id: id_event} })
    if(!event) throw new HttpException('Event not found', HttpStatus.NOT_FOUND)

    const participants = await this.inscriptionsRepository.find({
      where: { event: {id: id_event } }
    })
    
    try{
      const users = participants.map(insc => insc.user)
      return users
    }catch(e){
      throw new HttpException('Cannot Retrieve participants of this event', HttpStatus.NOT_FOUND)
    }
    
  }


  // inscrever participante em um evento e em todas as sessoes lecture
  async signupPartEvent(eventId: number, createInscriptionDto: CreateInscriptionDto){
    const event = await this.eventsRepository.findOne({ where: { id: eventId } })
    if(!event) throw new HttpException('Event not found!', HttpStatus.NOT_FOUND)

    const user = await this.usersRepository.findOne({ where: { id: createInscriptionDto.userid } })
    if(!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND)

    const existingInscription = await this.inscriptionsRepository.findOne({ where: { user: { id: createInscriptionDto.userid }, event: { id: eventId } } })
    if(existingInscription) throw new ConflictException('User alredy has a inscription in this event')

    const createdInscription = await this.inscriptionsRepository.create({
      ...createInscriptionDto,
      user: user,
      event: event,
    });

    await this.inscriptionsRepository.save(createdInscription)
    
    const sessions = await this.sessionsRepository.find({ where: { eventt: event, lecture: true }})
    //console.log(sessions)

    for(const session of sessions){
      await this.sessionsRepository.createQueryBuilder().relation(User, 'sessionn').of(user.id).add(session.id)
    }

    await this.usersRepository.save(user)

    return createdInscription
  }

  async findDoneEvents() {
    const agora = new Date();

    const doneevents = await this.eventsRepository.find({
      where: {
        dt_fin: LessThanOrEqual(agora),
        certificatesGenerated: false,
      },
      relations: ['sessions'],
    });

    if(doneevents.length > 0){
      return doneevents
    }
    
    return false
  }
}
