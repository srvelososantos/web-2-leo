import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    
  ) {}

  async validateUser(id: number, password: string) {
    const user = await this.usersService.findById(id)
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Senha inválida');

    const { password: _, ...result } = user; // remove a senha da resposta
    return result;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id, email: user.email, type: user.type };
    return { access_token: this.jwtService.sign(payload) };
  }

  async me(req){
    const user = await this.usersService.findById( req.user.sub )
    return {...user, password: ''}
  }

}
