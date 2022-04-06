import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Logger,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { ControlledError } from '../../entities/controlledError.entiti';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { Req } from '@nestjs/common';
import { Resp } from '../../shared/types/resp';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import {
  Success,
  Errors,
  NotTypeError,
  CommonErrorsResponses,
} from '../../utils';

@Controller('users')
@ApiTags('users')
@CommonErrorsResponses()
export class UsersController {
  private logger = new Logger(UsersController.name);
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @ApiResponse(Success.GET_PROFILE)
  getProfile(@Req() req, @Res() res: Response): void {
    res.status(Success.GET_PROFILE.status).send(req.user);
  }

  @Post('/')
  @ApiResponse(Success.REGISTER_USER)
  @ApiResponse(NotTypeError(Errors.EMAIL_NOT_AVAILABLE))
  async saveUser(@Res() res: Response, @Body() dto: UserDto): Resp {
    const userExists = await this.usersService.findOne(dto.email);
    if (userExists) {
      throw new ControlledError(
        Errors.EMAIL_NOT_AVAILABLE,
        `the email: ${dto.email} is not available, choose another`,
      );
    }
    const password = await bcrypt.hash(dto.password, 10);
    const user = await this.usersService.save({ ...dto, password });
    delete user.password;
    res.status(Success.REGISTER_USER.status).send(user);
  }

  @Put('/:id')
  @ApiResponse(Success.UPDATE_USER)
  async updateUser(
    @Res() res: Response,
    @Body() dto: UpdateUserDto,
    @Param('id') id: number,
  ): Resp {
    const userExists = this.usersService.findById(+id);
    if (!userExists)
      return res.status(Errors.USER_NOT_FOUND.status).send({
        ...Errors.USER_NOT_FOUND,
        message: `the user with id: ${id} does not exists`,
      });
    const user = await this.usersService.update(id, dto);
    res.status(Success.UPDATE_USER.status).send(user);
  }
}
