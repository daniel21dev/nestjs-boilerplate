import { Injectable } from '@nestjs/common';
import { UsersService } from '../modules/users/users.service';
import { User } from '../modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findOne(email);
    if (!user) return null;
    const isPasswordOk = await bcrypt.compare(pass, user.password);
    if (isPasswordOk) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login({ id, email }: User) {
    const payload = { id, email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
