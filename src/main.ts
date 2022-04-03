import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exceptionFactory } from './utils/exception.factory';
import { ErrorsFilter } from './utils/errors.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory,
    }),
  );
  app.useGlobalFilters(new ErrorsFilter());
  await app.listen(3000);
}
bootstrap();
