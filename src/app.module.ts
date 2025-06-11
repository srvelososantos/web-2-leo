import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { SessionsModule } from './sessions/sessions.module';
import { InscriptionModule } from './inscription/inscription.module';
import { CertificateModule } from './certificate/certificate.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ 
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      database: 'postgres',
      username: 'postgres',
      password: 'postgres',
      synchronize: true,
      autoLoadEntities: true,
      logging: false,
      migrations: [__dirname + 'database/migrations/*{.js,.ts}'],
    }), EventsModule, UsersModule, SessionsModule, InscriptionModule, CertificateModule ,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
