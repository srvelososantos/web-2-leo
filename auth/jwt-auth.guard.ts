import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException('Você precisa estar autenticado para acessar essa rota');
    }
    return user;
  }
}