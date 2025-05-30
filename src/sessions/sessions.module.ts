import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Event } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Session, Event])],
  controllers: [SessionsController],
  providers: [SessionsService],
})
export class SessionsModule {}
