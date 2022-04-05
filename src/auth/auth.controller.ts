import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginResponse } from './entities/login-response';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req): Promise<LoginResponse> {
    const payload = this.authService.login(req.user);
    return payload;
  }
}
