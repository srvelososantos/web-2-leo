import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('certificates')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    //return this.certificateService.create(createCertificateDto);
  }

  @ApiOperation({ summary: 'Listar todos os certificados emitidos para um participante.' })
  @ApiResponse({ status: 200, description: 'Certificados listados com sucesso' })
  @Get('participant/:id')
  allParticipants(@Param('id') id: number) {
    return this.certificateService.findAllParticipants(id);
  }

  @ApiOperation({ summary: 'Listar todos os certificados emitidos para um palestrante.' })
  @ApiResponse({ status: 200, description: 'Certificados listados com sucesso' })
  @Get('speaker/:id')
  allSpeakers(@Param('id') id: string) {
    return this.certificateService.findOne(+id);
  }

  @ApiOperation({summary: 'Validar a autenticidade de um certificado com base em seu código único.'})
  @ApiResponse({ status: 200, description:'Autenticidade validada com sucesso' })
  @Get('validate/:id')
  validateCode(@Param('id') id: string) {
    return this.certificateService.validateCode(id);
  }

  @Patch('validate/:id/revoke')
  update(@Param('id') id: number) {
    return this.certificateService.update(id);
  }
}
