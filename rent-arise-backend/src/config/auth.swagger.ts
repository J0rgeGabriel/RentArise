import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthModule } from 'src/app/auth/auth.module';

export function setupAuthSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('RentArise Auth API')
    .setDescription('Endpoints related to authentication')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule],
  });

  SwaggerModule.setup('api/swagger/auth', app, document);
}