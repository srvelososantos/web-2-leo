import { Module } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { InscriptionController } from './inscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [InscriptionController],
  providers: [InscriptionService],
})
export class InscriptionModule {}
