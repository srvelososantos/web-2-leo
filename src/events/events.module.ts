import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscriptions } from 'src/inscription/entities/inscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Inscriptions])],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
