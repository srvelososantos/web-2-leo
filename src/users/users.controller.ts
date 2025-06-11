import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userCreated = await this.usersService.createUser(createUserDto);
    return userCreated
  }

  @Get()
  async findAllUsers() {
    return await this.usersService.findAllUsers()
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findById(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.usersService.removeOne(+id)
  }
}
