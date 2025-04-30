import { INestApplication } from '@nestjs/common';
import { setupAuthSwagger } from './auth.swagger';
import { setupUserSwagger } from './user.swagger';

export function setupSwagger(app: INestApplication) {
  setupAuthSwagger(app);
  setupUserSwagger(app);
}