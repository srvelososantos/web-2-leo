import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Certificate } from 'src/certificate/entities/certificate.entity';
import { Organizer } from './entities/organizer.entity';
import { Speaker } from './entities/speaker.entity';
import { Participant } from './entities/participant.entity';

@Module({
  imports: [ TypeOrmModule.forFeature([User, Certificate, Speaker, Participant, Organizer]) ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
