import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(private readonly prisma: PrismaService) {}

  get(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  findOne(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async save(data: UserDto): Promise<User> {
    const password = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({ data: { ...data, password } });
  }
}
