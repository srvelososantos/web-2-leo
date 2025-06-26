import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CertificateService } from './certificate.service';
import { CreateCertificateDto } from './dto/create-certificate.dto';
import { UpdateCertificateDto } from './dto/update-certificate.dto';

@Controller('certificate')
export class CertificateController {
  constructor(private readonly certificateService: CertificateService) {}

  @Post()
  create(@Body() createCertificateDto: CreateCertificateDto) {
    //return this.certificateService.create(createCertificateDto);
  }

  @Get('participant/:id')
  allParticipants(@Param('id') id: number) {
    return this.certificateService.findAllParticipants(id);
  }

  @Get('speaker/:id')
  allSpeakers(@Param('id') id: string) {
    return this.certificateService.findOne(+id);
  }

  @Get('validate/:id')
  validateCode(@Param('id') id: string) {
    return this.certificateService.findOne(+id);
  }

  @Patch('validate/:id')
  update(@Param('id') id: string, @Body() updateCertificateDto: UpdateCertificateDto) {
    return this.certificateService.update(+id, updateCertificateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.certificateService.remove(+id);
  }
}
