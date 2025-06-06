import { ConflictException, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
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
    private readonly sessionsRepository: Repository<Session>
  ) {}

  async create(createEventDto: CreateEventDto): Promise<CreateEventDto> {
    const  createdEvent = await this.eventsRepository.save(createEventDto)
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

  async remove(id: number) {
    return this.eventsRepository.delete(id)
  }


  //responsavel por inscrever participante em um evento
  async signupPartEvent(eventId: number, userId: number, createInscriptionDto: CreateInscriptionDto){
    const event = await this.eventsRepository.findOne({ where: { id: eventId } })
    if(!event) throw new HttpException('Event not found!', HttpStatus.NOT_FOUND)
    userId = 24
    const user = await this.usersRepository.findOne({ where: { id: userId } })
    if(!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND)
    const existingInscription = await this.inscriptionsRepository.findOne({ where: { user: { id: userId }, event: { id: eventId } } })
    if(existingInscription) throw new ConflictException('User alredy has a inscription in this event')

    const createdInscription = await this.inscriptionsRepository.create({
      ...createInscriptionDto,
      user: user,
      event: event,
    });

    this.inscriptionsRepository.save(createdInscription)
    
    const sessions = await this.sessionsRepository.find({ where: { eventt: event, lecture: true }})
    console.log(sessions)

    for(const session of sessions){
      await this.sessionsRepository.createQueryBuilder().relation(User, 'sessionn').of(user.id).add(session.id)
    }

    await this.usersRepository.save(user)

    return createdInscription
  }
}
