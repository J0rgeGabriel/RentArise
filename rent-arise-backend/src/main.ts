import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { setupSwagger } from './config/swagger.config';
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);
  app.enableCors();

  //app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();