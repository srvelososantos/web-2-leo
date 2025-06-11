import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Put, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuario criado com sucesso' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userCreated = await this.usersService.createUser(createUserDto);
    return userCreated
  }

  @Get()
  @ApiOperation({ summary: 'Recupera todos os usuários' })
  @ApiResponse({ status: 200, description: 'Usuario recuperados com sucesso' })
  async findAllUsers() {
    return await this.usersService.findAllUsers()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Recupera um usuário' })
  @ApiResponse({ status: 200, description: 'Usuario recuperado com sucesso' })
  findOne(@Param('id') id: number) {
    return this.usersService.findById(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Modifica dados de um usuário' })
  @ApiResponse({ status: 200, description: 'Dados do usuário modificados com sucesso' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiResponse({ status: 204, description: 'Usuário deletado com sucesso' })
  async remove(@Param('id') id: number) {
    return await this.usersService.removeOne(+id)
  }
}
