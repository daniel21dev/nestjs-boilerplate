import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

export function JwtDecorators() {
  return applyDecorators(
    ApiBearerAuth('Authorization'),
    ApiHeader({ name: 'Authorization', required: true }),
    UseGuards(JwtAuthGuard),
  );
}
