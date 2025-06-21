import { SetMetadata } from '@nestjs/common';
import { usertypes } from 'src/enums/usertypes.enum';

export const ROLES_KEY = 'roles';
export const RequiredRoles = (...roles: usertypes[]) => SetMetadata(ROLES_KEY, roles);
