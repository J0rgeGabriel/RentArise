import { INestApplication } from '@nestjs/common';
import { setupAuthSwagger } from './auth.swagger';
import { setupUserSwagger } from './user.swagger';
import { setupProductSwagger } from './product.swagger';

export function setupSwagger(app: INestApplication) {
  setupAuthSwagger(app);
  setupUserSwagger(app);
  setupProductSwagger(app);
}