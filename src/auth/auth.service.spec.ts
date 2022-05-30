import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthModule } from './auth.module';
import { PrismaModule } from '../shared/prisma/prisma.module';
import { UsersModule } from '../modules/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const config = new ConfigService();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        AuthModule,
        UsersModule,
        ConfigModule.forRoot({ envFilePath: '.test.env' }),
        JwtModule.register({ secret: config.get('JWT_SECRET') }),
      ],
      providers: [AuthService],
    }).compile();
    console.log(process.env.NODE_ENV);
    service = await module.resolve(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
