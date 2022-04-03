import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { exceptionFactory } from './utils/exception.factory';
import { ErrorsFilter } from './utils/errors.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory,
    }),
  );
  app.useGlobalFilters(new ErrorsFilter());

  const config = new DocumentBuilder()
    .setTitle('nestjs boilerplate')
    .setDescription('...')
    .setVersion('1.0')
    .addTag('nestjs boilerplate')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
