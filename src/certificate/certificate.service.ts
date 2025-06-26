import { Injectable } from '@nestjs/common';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { Certificate } from './entities/certificate.entity';
import { LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Session } from 'src/sessions/entities/session.entity';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Event } from 'src/events/entities/event.entity';
import { EventsService } from 'src/events/events.service';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';
import { Inscriptions } from 'src/inscription/entities/inscription.entity';

@Injectable()
export class CertificateService {

  constructor(
    @InjectRepository(Certificate)
    private readonly certificateRepository: Repository<Certificate>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,

    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,

    @InjectRepository(Inscriptions)
    private readonly inscriptionsRepository: Repository<Inscriptions>,

    private readonly eventsService: EventsService

    
  ){  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async createCertificate() {
    const doneEvents = await this.eventsService.findDoneEvents()

    if(doneEvents){
        for(const event of doneEvents){
          
          const pdfCreator = {
            nome_participante: '',
            nome_sessao: '',
            uuid: ''
          }

          const validationCode = uuidv4()
          const doc = new PDFDocument()
          
          const pdfPath = `certificates/${event.id}.pdf`;
          const fullPath = path.join(__dirname, '../../public', pdfPath);

          fs.mkdirSync(path.dirname(fullPath), { recursive: true });
          doc.pipe(fs.createWriteStream(fullPath));

          const inscriptions = await this.inscriptionsRepository.find(
            {where: { user: event.user }, relations: ['user', 'event']}
          )

          for(const inscrip of inscriptions){
            console.log(`inscrpt id: ${inscrip.id}-----------------|`)
            const users = await this.usersRepository.find({ where: { id: inscrip.user.id }, relations: ['sessionn'] })
            
            for(const session of users){
              
              for(const sessions2 of session.sessionn){
                pdfCreator.nome_participante = inscrip.user.name
                pdfCreator.nome_sessao = sessions2.title
              }
            }
          }
          pdfCreator.uuid = validationCode;
          const certificate = await this.certificateRepository.create({ 

           })


          doc.fontSize(20).text(`Certificado de Participação`, { align: 'center' });
          doc.moveDown();
          doc.fontSize(14).text(`Certificamos que ${pdfCreator.nome_participante} participou da sessão "${pdfCreator.nome_sessao}".`);
          doc.moveDown();
          doc.text(`Data: ${event.dt_ini.toLocaleString()}`);
          doc.text(`Código de validação: ${pdfCreator.uuid}`);

          doc.end();

          //Atualiza o campo `certificatesGenerated` via query direta ou repositório
          await this.eventsService.markAsWithCertificates(event.id);
        }
    }
    //...
    //nenhum evento terminado encontrado
  }

  async findAllParticipants(id: number) {
    const usercert = await this.usersRepository.find({where: {id: id}})
    return  usercert
  }

  findOne(id: number) {
    return `This action returns a #${id} certificate`;
  }

  update(id: number, updateCertificateDto: UpdateCertificateDto) {
    return `This action updates a #${id} certificate`;
  }

  remove(id: number) {
    return `This action removes a #${id} certificate`;
  }

  
}
