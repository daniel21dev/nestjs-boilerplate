import {
  Body,
  Controller,
  Get,
  Res,
  Logger,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Req } from '@nestjs/common';
import { Resp } from '../../shared/types/resp';
import { UpdateUserDto } from './dto/update-user.dto';
import { Success, Errors, CommonErrorsResponses } from '../../utils';
import { JwtDecorators } from '../../utils/decorators/jwt.decorator';
import { ControlledError } from '../../entities/controlledError.entity';

@Controller('users')
@ApiTags('users')
@JwtDecorators()
@CommonErrorsResponses()
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @ApiResponse(Success.GET_USERS)
  async getUsers(@Res() res: Response): Resp {
    const users = await this.usersService.get();
    const safeUsers = users.map((u) => {
      delete u.password;
      return u;
    });
    res.status(Success.GET_USERS.status).send(safeUsers);
  }

  @Get('/profile')
  @ApiResponse(Success.GET_PROFILE)
  getProfile(@Req() req, @Res() res: Response): void {
    res.status(Success.GET_PROFILE.status).send(req.user);
  }

  @Put('/:id')
  @ApiResponse(Success.UPDATE_USER)
  async updateUser(
    @Res() res: Response,
    @Body() dto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Resp {
    const userExists = this.usersService.findById(+id);
    if (!userExists)
      throw new ControlledError(
        Errors.USER_NOT_FOUND,
        `the user with id: ${id} does not exists`,
      );
    const user = await this.usersService.update(+id, dto);
    delete user.password;
    res.status(Success.UPDATE_USER.status).send(user);
  }
}
