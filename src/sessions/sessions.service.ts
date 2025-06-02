import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { Event } from 'src/events/entities/event.entity';

@Injectable()
export class SessionsService {

  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ){}

  async create(id: number, createSessionDto: CreateSessionDto) {
    const searchEvent = await this.eventRepository.findOne({
      where: { id: id },
      relations: ['sessions']
    });
    if(!searchEvent) throw new HttpException('Event not found!', HttpStatus.NOT_FOUND)
    
    const createdSession = await this.sessionsRepository.create({
      ...createSessionDto,
      eventt: searchEvent,
    });

    return this.sessionsRepository.save(createdSession);
  }

  async findById(id: number) {
    const searchSessions = await this.sessionsRepository.find({
      where: {id: id}
    })
    if(searchSessions.length === 0) throw new HttpException('Session not found!', HttpStatus.NOT_FOUND)
    return searchSessions;
  }

  async findByEventId(id: number): Promise<Session[]> {
    const searchEvent = await this.eventRepository.findOne({
      where: { id: id },
      relations: ['sessions']
    });
    if(!searchEvent){
      throw new HttpException('Event not found!', HttpStatus.NOT_FOUND)
    }else{
      if(searchEvent.sessions.length === 0) throw new HttpException('Sessions not found!', HttpStatus.NOT_FOUND)
    }
    return searchEvent.sessions
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    const searchSession = await this.sessionsRepository.findOne({
      where: { id }
    });
    if(!searchSession) throw new HttpException('Session not found!', HttpStatus.NOT_FOUND)

    Object.assign(searchSession, updateSessionDto)
    return this.sessionsRepository.save(searchSession)
  }

  remove(id: number) {
    return this.sessionsRepository.delete(id)
  }
}
