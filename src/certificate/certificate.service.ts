import { BadRequestException, HttpCode, HttpException, HttpStatus, Inject, Injectable, Scope } from '@nestjs/common';
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
import { REQUEST } from '@nestjs/core';
import { validate as validateUUID } from 'uuid';



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

    private readonly eventsService: EventsService,

    
  ){  }

  async pdfMaker(participant_name, session_name, dt_fin, userid, session_id){

    const validationCode = uuidv4()
    const doc = new PDFDocument()
    
    const pdfPath = `certificates/${validationCode}.pdf`;
    const fullPath = path.join(__dirname, '../../public', pdfPath);

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    doc.pipe(fs.createWriteStream(fullPath));

    const user = await this.usersRepository.findOne({ where: { id: userid } })
    if(!user){ throw new HttpException('user not found', HttpStatus.NOT_FOUND) }

    const session = await this.sessionsRepository.findOne({where: { id: session_id } })
    if(!session) throw new HttpException('Session not found!', HttpStatus.NOT_FOUND)

    const certificate = await this.certificateRepository.create({ 
      val_code: validationCode,
      em_date: dt_fin,
      user: user,
      event_session: session,
      revoked: false
    })
    this.certificateRepository.save(certificate)

    doc.fontSize(20).text(`Certificado de Participação`, { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Certificamos que ${participant_name} participou da sessão "${session_name}".`);
    doc.moveDown();
    doc.text(`Data: ${dt_fin.toLocaleString()}`);
    doc.text(`Código de validação: ${validationCode}`);

    doc.end();
  }

  @Cron(CronExpression.EVERY_5_SECONDS)
  async createCertificate() {
    const doneEvents = await this.eventsService.findDoneEvents()

    if(doneEvents){
        for(const event of doneEvents){
          const inscriptions = await this.inscriptionsRepository.find(
            {where: { user: event.user, event: {id: event.id} }, relations: ['user', 'event']}
          )

          for(const inscrip of inscriptions){
            const users = await this.usersRepository.find({ where: { id: inscrip.user.id }, relations: ['sessionn'] })
            
            for(const session of users){
              
              for(const sessions2 of session.sessionn){
                this.pdfMaker(inscrip.user.name, sessions2.title, event.dt_fin, inscrip.user.id, sessions2.id)
              }
            }
          }
          
          //Atualiza o campo `certificatesGenerated` via query direta ou repositório
          await this.eventsService.markAsWithCertificates(event.id);
        }
    }
    //...
    //nenhum evento terminado encontrado
  }

  async findAllParticipants(id: number) {
    const usercert = await this.usersRepository.find({where: {id: id}})
    if(usercert.length === 0) throw new HttpException('Participants not found', HttpStatus.NOT_FOUND)
    return  usercert
  }

  async findOne(id: number) {
    const usercert = await this.usersRepository.find({where: {id: id, type: 'Speaker'}})
    if(usercert.length === 0) throw new HttpException('Speakers not found', HttpStatus.NOT_FOUND)
    return  usercert
  }

  async validateCode(code: string ){
    const isValidUUID = validateUUID(code);
    if (!isValidUUID) {
      throw new HttpException('Code is not valid', HttpStatus.BAD_REQUEST);
    }

    const certificado = await this.certificateRepository.findOne({
      where: { val_code: code },
      relations: ['user'],
    });

    if (!certificado) {
      throw new HttpException('Code not found', HttpStatus.NOT_FOUND);
    }

    return {
      valido: true,
      nome: certificado.user.name,
      data: certificado.em_date.toLocaleDateString(),
    };
    
  }

  async update(code: number) {
    const certificado = await this.certificateRepository.findOne({
      where: { id: code, revoked: false },
      relations: ['user'],
    });

    if (!certificado) {
      return { valido: false, mensagem: 'Código não encontrado' };
    }
    certificado.revoked = true
    this.certificateRepository.save(certificado)
  }

  remove(id: number) {
    return `This action removes a #${id} certificate`;
  }

}
