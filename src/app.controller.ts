import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { EventsService } from './events/events.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly eventsService: EventsService) {}

  //@Get('admin/events/:id/report')
  //async create(@Param() id: number) {
  //  return await this.eventsService.report(id);
  //}
}
