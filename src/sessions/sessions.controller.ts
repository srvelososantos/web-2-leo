import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe, Put } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { response, Response } from 'express';
import { Session } from './entities/session.entity';

@Controller()
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('events/:id/sessions')
  async create(@Res() response: Response, @Body() createSessionDto: CreateSessionDto, @Param('id', ParseIntPipe) id: number,): Promise<Session | Record<string, any>> {
    await this.sessionsService.create(id, createSessionDto)
    return response.status(200).json({ message: "Session Created Succesfully!" })
  }

  @Get('events/:id/sessions')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Session[]> {
    return this.sessionsService.findByEventId(id);
  }

  @Get('sessions/:id')
  findBySessionId(@Param('id', ParseIntPipe) id: number): Promise<Session[]> {
    return this.sessionsService.findById(id);
  }

  @Put('sessions/:id')
  update(@Param('id') id: ParseIntPipe, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete('sessions/:id')
  async remove(@Param('id') id: number) {
    await this.sessionsService.remove(+id);
    return response.status(204)
  }
}
