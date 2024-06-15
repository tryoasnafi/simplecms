import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { users } from '@prisma/client';
import { ROLES_KEY } from '../auth.type';

@Injectable()
export class RoleAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = Reflect.getMetadata(ROLES_KEY, context.getHandler());
    if (!requiredRoles) {
      return true;
    }

    const { user }: { user: users } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => role === user.role);
  }
}
