import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Organizer } from './entities/organizer.entity';
import { Speaker } from './entities/speaker.entity';
import { Participant } from './entities/participant.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @InjectRepository(Organizer)
    private readonly organizersRepository: Repository<Organizer>,

    @InjectRepository(Speaker)
    private readonly speakersRepository: Repository<Speaker>,

    @InjectRepository(Participant)
    private readonly participantsRepository: Repository<Participant>,

  ){  }

  
  
  async createUser(UserDto: CreateUserDto) {
    try{
      const hashedPassword = await bcrypt.hash(UserDto.password, 10);

      const createdUser = this.usersRepository.create({
        ...UserDto,
        password: hashedPassword
      });

      if(UserDto.type === 'Speaker') { await this.speakersRepository.save(createdUser); }

      if(UserDto.type === 'Participant') { await this.participantsRepository.save(createdUser); }

      if(UserDto.type === 'Organizer') { await this.organizersRepository.save(createdUser); }

      return createdUser;
    }catch(e){
      throw new HttpException(e, HttpStatus.BAD_REQUEST)
    }
    
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
    try{
      await this.usersRepository.delete(id)
      return user 
    }catch(e){
      throw new HttpException('Cannot delete user', HttpStatus.BAD_REQUEST)
    }
  
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
