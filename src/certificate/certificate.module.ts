import { Module } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CertificateController } from './certificate.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Certificate } from './entities/certificate.entity';
import { Event } from 'src/events/entities/event.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { EventsService } from 'src/events/events.service';
import { Inscriptions } from 'src/inscription/entities/inscription.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User, Certificate, Event, Session, Inscriptions])],
  controllers: [CertificateController],
  providers: [CertificateService, EventsService],
})
export class CertificateModule {}
