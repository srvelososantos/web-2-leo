import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req } from '@nestjs/common';
import { InscriptionService } from './inscription.service';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { signupOtherSessions } from './dto/signupOtherSessions.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('enrollments')
export class InscriptionController {
  constructor(private readonly inscriptionService: InscriptionService) {

  }

  @Post(':id/workshops')
  @ApiOperation({ summary: 'Inscreve um usuario em uma sessão' })
  @ApiResponse({ status: 201, description: 'Usuario inscrito com sucesso' })
  create(@Param('id') id: number, @Body() signupOtherSessions: signupOtherSessions, @Req() req: any) {
    return this.inscriptionService.signupOtherSessions(id, signupOtherSessions, req);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta uma inscriçao' })
  @ApiResponse({ status: 201, description: 'Inscrição deletada com sucesso e também suas respectivas sessões' })
  async remove(@Param('id') id: number) {
    return await this.inscriptionService.remove(+id);
  }
}
