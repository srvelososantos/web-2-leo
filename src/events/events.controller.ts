import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, Put, UseGuards } from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { CreateInscriptionDto } from 'src/inscription/dto/create-inscription.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { RequiredRoles } from './../auth/decorators/req-role.decorator';
import { usertypes } from 'src/enums/usertypes.enum';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  
  @Post()
  @RequiredRoles(usertypes.organizer)
  @ApiOperation({ summary: 'Cria novo evento' })
  @ApiResponse({ status: 201, description: 'Evento criado com sucesso' })
  async create(@Body() createEventDto: CreateEventDto) {
    return await this.eventsService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: 'Recupera todos os eventos' })
  @ApiResponse({ status: 200, description: 'Eventos recuperados com sucesso' })
  async findAll() {
    return await this.eventsService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recupera um evento' })
  @ApiResponse({ status: 200, description: 'Evento recuperado com sucesso' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Put(':id')
  @RequiredRoles(usertypes.organizer)
  @ApiOperation({ summary: 'Modifica um evento' })
  @ApiResponse({ status: 200, description: 'Eventos modificado com sucesso' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um evento' })
  @ApiResponse({ status: 204, description: 'Evento deletado com sucesso' })
  remove(@Param('id') id: number) {
    return this.eventsService.remove(id);
  }


  @Post(':id/enrollments')
  @ApiOperation({ summary: 'Cria uma nova inscriçao' })
  @ApiResponse({ status: 201, description: 'Inscriçao criada com sucesso' })
  createInsciption(@Param('id') id: number, @Body() createInscriptionDto: CreateInscriptionDto){
    return this.eventsService.signupPartEvent(id, createInscriptionDto)
  }

  @Get(':id/participants')
  @ApiOperation({ summary: 'Recupera todos os usuários participantes de um evento' })
  @ApiResponse({ status: 200, description: 'Usuários recuperados com sucesso' })
  getParticipants(@Param('id') id: number){
    return this.eventsService.participants(id)
  }
  
}
