import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { signupOtherSessions } from './dto/signupOtherSessions.dto';

@Controller('enrollments')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {

  }

  @Post(':id/workshops')
  create(@Param() id: number, @Body() signupOtherSessions: signupOtherSessions) {
    return this.inscriptionService.signupOtherSessions(id, signupOtherSessions);
  }

  @Get()
  findAll() {
    return this.inscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inscriptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInscriptionDto: UpdateInscriptionDto) {
    return this.inscriptionService.update(+id, updateInscriptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inscriptionService.remove(+id);
  }
}
