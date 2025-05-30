import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>
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
}
