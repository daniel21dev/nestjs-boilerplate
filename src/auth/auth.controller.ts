import {
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
  Logger,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Resp } from '../shared/types/resp';
import { Success, CommonErrorsResponses, NotTypeError, Errors } from '../utils';
import { UsersService } from '../modules/users/users.service';
import { UserDto } from '../modules/users/dto/user.dto';
import { ControlledError } from '../entities/controlledError.entity';
import * as bcrypt from 'bcrypt';

@ApiTags('auth')
@Controller('auth')
@CommonErrorsResponses()
export class AuthController {
  private logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Post('/signup')
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

  @Post('/login')
  @ApiResponse(Success.LOGIN_USER)
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req,
    @Res() res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() dto: LoginDto, // needed for swagger docs
  ): Resp {
    const payload = await this.authService.login(req.user);
    res.status(Success.LOGIN_USER.status).send(payload);
  }
}
