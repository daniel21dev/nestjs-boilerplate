import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../shared/prisma/prisma.service';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  findById(id: number): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  save(data: UserDto): Promise<User> {
    return this.prisma.user.create({ data });
  }

  update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
