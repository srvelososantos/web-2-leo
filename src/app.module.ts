import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [ __dirname + '/**/*.entity{.ts,.js}' ],
      synchronize: true,
      logging: true,
    }), EventsModule, UsersModule, SessionsModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
