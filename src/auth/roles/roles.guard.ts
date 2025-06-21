import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { usertypes } from 'src/enums/usertypes.enum';
import { ROLES_KEY } from '../decorators/req-role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor( private reflector: Reflector ){}

  canActivate(context: ExecutionContext,): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<usertypes[]>(ROLES_KEY, [ context.getHandler(), context.getClass() ]);

    if (!requiredRoles) {
      return true; // Se não tiver roles definidas, permite o acesso
    }

    const { user } = context.switchToHttp().getRequest();

    if (!requiredRoles.includes(user.type)) {
      throw new ForbiddenException('You do not have permission to access this resource, ' + requiredRoles + ' - ' + user.type);
    }

    return true;

  }

}
