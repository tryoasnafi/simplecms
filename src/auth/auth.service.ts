import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn({ email, password: pass }: SignInDto) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    const isMatch = await this.usersService.verifyPassword(user.password, pass);
    if (!isMatch) {
      throw new UnauthorizedException('Email or password is incorrect');
    }
    const payload = { sub: user.id, email: email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  searchUser(id: number) {
    return this.usersService.findById(id);
  }
}
