import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  UseFilters,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ControlledError } from '../../entities/controlledError.entiti';
import { Errors } from '../../utils/error.dictionary';

@Controller('users')
export class UsersController {
  private logger = new Logger(UsersController.name);
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
  async saveUser(
    @Res() res: Response,
    @Body() dto: UserDto,
  ): Promise<Response | void> {
    const userExists = await this.usersService.findOne(dto.email);
    if (userExists) {
      throw new ControlledError(
        Errors.EMAIL_NOT_AVAILABLE,
        `the email: ${dto.email} is not available, chose another`,
      );
    }
    const user = await this.usersService.save(dto);
    res.send(user);
  }
}
