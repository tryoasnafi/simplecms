import { enumRoles } from '@prisma/client';

export class CreateUserDto {
  email: string;
  name: string;
  password: string;
  role: enumRoles;
}
