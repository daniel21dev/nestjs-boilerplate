import { Body, Controller, Get, Post, Res, Logger } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ControlledError } from '../../entities/controlledError.entiti';
import { Errors, NotTypeError } from '../../utils/error.dictionary';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Success } from '../../utils/success.dictionary';
import { CommonErrorsResponses } from '../../utils/decorators/commonErrors.decorator';

@Controller('users')
@ApiTags('users')
@CommonErrorsResponses()
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @ApiResponse(Success.GET_USERS)
  async getUsers(@Res() res: Response): Promise<void> {
    const users = await this.usersService.get();
    const safeUsers = users.map((u) => {
      delete u.password;
      return u;
    });
    res.status(Success.GET_USERS.status).send(safeUsers);
  }

  @Post('/')
  @ApiResponse(Success.REGISTER_USER)
  @ApiResponse(NotTypeError(Errors.EMAIL_NOT_AVAILABLE))
  async saveUser(@Res() res: Response, @Body() dto: UserDto): Promise<void> {
    const userExists = await this.usersService.findOne(dto.email);
    if (userExists) {
      throw new ControlledError(
        Errors.EMAIL_NOT_AVAILABLE,
        `the email: ${dto.email} is not available, chose another`,
      );
    }
    const user = await this.usersService.save(dto);
    res.status(Success.REGISTER_USER.status).send(user);
  }
}
