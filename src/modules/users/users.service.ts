import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  private logger = new Logger(UsersService.name);
  constructor(private readonly prisma: PrismaService) {}

  get(): Promise<User[]> {
    return this.prisma.user.findMany({});
  }

  save(data: UserDto): Promise<Omit<User, 'password'>> {
    return this.prisma.user.create({ data });
  }
}
