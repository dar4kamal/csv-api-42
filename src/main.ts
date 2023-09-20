import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ValidationExceptionFilter } from './common/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ValidationExceptionFilter());

  await app.listen(process.env.PORT || 5000);
}
bootstrap();
