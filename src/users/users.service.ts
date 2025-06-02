import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ){  }
  
  async createUser(UserDto: CreateUserDto): Promise<CreateUserDto> {
    const createdUser = await this.usersRepository.save(UserDto);
    return createdUser;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find()
    if(users.length === 0) throw new HttpException('Users not found!', HttpStatus.NOT_FOUND)
    return users;
  }

  async removeOne(id: number){
    const user = await this.usersRepository.findOne({
      where: { id }
    })
    if(!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND)
    
    await this.usersRepository.delete(id)
    return user
  }

  async removeAll() {
    return this.usersRepository.deleteAll();
  }

  async findById(id: number): Promise<User | null> {
    const re = await this.usersRepository.findOne({ 
      where: { id }
     })
     if(!re) throw new HttpException('User not found!', HttpStatus.NOT_FOUND)
    return re;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { id }
    })
    if(!user) throw new HttpException('User not found!', HttpStatus.NOT_FOUND)
    
    Object.assign(user, updateUserDto)
    return this.usersRepository.save(user);
  }

  
}
