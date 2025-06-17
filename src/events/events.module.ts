import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inscriptions } from 'src/inscription/entities/inscription.entity';
import { Event } from './entities/event.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { User } from 'src/users/entities/user.entity';
import { AuthModule } from 'auth/auth.module';

@Module({
  imports: [ TypeOrmModule.forFeature([Event, Inscriptions, Session, User]), AuthModule ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [ TypeOrmModule ]
})
export class EventsModule {}
