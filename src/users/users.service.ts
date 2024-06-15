import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const ErrUserNotFound = new NotFoundException('User not found');
const ErrEmailAlreadyExists = new NotFoundException('Email already exists');

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw ErrEmailAlreadyExists;
    }
    const hash = await this.hashPassword(createUserDto.password);
    return this.db.users.create({
      data: {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hash,
        role: createUserDto.role,
      },
    });
  }

  findAll() {
    return this.db.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.db.users.findFirst({ where: { email } });
  }

  async findById(id: number) {
    try {
      return await this.db.users.findUnique({ where: { id } });
    } catch (error) {
      throw ErrUserNotFound;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return await this.db.users.update({
        where: { id },
        data: {
          email: updateUserDto.email,
          name: updateUserDto.name,
          password: updateUserDto.password,
          role: updateUserDto.role,
          updated_at: new Date(),
        },
      });
    } catch (error) {
      throw ErrUserNotFound;
    }
  }

  async remove(id: number) {
    try {
      return await this.db.users.delete({ where: { id: id } });
    } catch (error) {
      throw ErrUserNotFound;
    }
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  verifyPassword(hashedPassword: string, password: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
