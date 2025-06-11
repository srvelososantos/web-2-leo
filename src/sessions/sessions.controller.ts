import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe, Put, HttpCode } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { Session } from './entities/session.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @ApiOperation({ summary: 'Cria uma nova sessão ' })
  @ApiResponse({ status: 201, description: 'Sessão criada e atrelada a um evento' })
  @Post('events/:id/sessions')
  async create(@Body() createSessionDto: CreateSessionDto, @Param('id', ParseIntPipe) id: number,): Promise<Session | Record<string, any>> {
    const res = await this.sessionsService.create(id, createSessionDto)
    return res
  }

  @ApiOperation({ summary: 'Recupera sessões a partir do id de um evento' })
  @ApiResponse({ status: 200, description: 'Sessões recuperadas com sucesso' })
  @Get('events/:id/sessions')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Session[]> {
    return this.sessionsService.findByEventId(id);
  }

  @ApiOperation({ summary: 'Recupera uma sessão' })
  @ApiResponse({ status: 200, description: 'Sessão recuperada a partir de seu id' })
  @Get('sessions/:id')
  findBySessionId(@Param('id', ParseIntPipe) id: number): Promise<Session[]> {
    return this.sessionsService.findById(id);
  }

  @ApiOperation({ summary: 'Modifica uma sessão' })
  @ApiResponse({ status: 200, description: 'Sessão modificada a partir de seu id' })
  @Put('sessions/:id')
  update(@Param('id') id: ParseIntPipe, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @ApiOperation({ summary: 'Deleta uma sessão' })
  @ApiResponse({ status: 204, description: 'Sessão deletada a partir de seu id' })
  @HttpCode(204)
  @Delete('sessions/:id')
  async remove(@Param('id') id: number) {
    return await this.sessionsService.remove(id);
  }
  
  @ApiOperation({ summary: 'Recupera usuários participantes de uma sessão' })
  @ApiResponse({ status: 200, description: 'Usuários recuperados com sucesso' })
  @Get('sessions/:id/participants')
  getParticipants(@Param('id') id: number){
    return this.sessionsService.participants(id)
  }

}
