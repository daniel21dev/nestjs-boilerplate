import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  async getUsers(@Res() res: Response): Promise<void> {
    const users = await this.usersService.get();
    const safeUsers = users.map((u) => {
      delete u.password;
      return u;
    });
    res.send(safeUsers);
  }

  @Post('/')
  async saveUser(@Res() res: Response, @Body() dto: UserDto): Promise<void> {
    const user = await this.usersService.save(dto);
    res.send(user);
  }
}
