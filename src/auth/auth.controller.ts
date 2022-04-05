import { Controller, Post, Req, Res, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Success } from '../utils/success.dictionary';
import { CommonErrorsResponses } from '../utils/decorators/commonErrors.decorator';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
@CommonErrorsResponses()
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  @ApiResponse(Success.LOGIN_USER)
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() req,
    @Res() res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() dto: LoginDto, // needed for swagger docs
  ): Promise<void> {
    const payload = await this.authService.login(req.user);
    res.status(Success.LOGIN_USER.status).send(payload);
  }
}
