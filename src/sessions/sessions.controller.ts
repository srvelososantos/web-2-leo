import { Controller, Get, Post, Body, Patch, Param, Delete, Res, ParseIntPipe, Put, HttpCode } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { response, Response } from 'express';
import { Session } from './entities/session.entity';

@Controller()
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post('events/:id/sessions')
  async create(@Body() createSessionDto: CreateSessionDto, @Param('id', ParseIntPipe) id: number,): Promise<Session | Record<string, any>> {
    const res = await this.sessionsService.create(id, createSessionDto)
    return res
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

  @HttpCode(204)
  @Delete('sessions/:id')
  async remove(@Param('id') id: number) {
    return await this.sessionsService.remove(+id);
  }
}
