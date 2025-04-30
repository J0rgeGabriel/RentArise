import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { UserModule } from 'src/app/user/user.module';

export function setupUserSwagger(app: INestApplication) {
  const userDocConfig = new DocumentBuilder()
    .setTitle('RentArise User API')
    .setDescription('Endpoints related to user management')
    .setVersion('1.0')
    .build();

  const userDocument = SwaggerModule.createDocument(app, userDocConfig, {
    include: [UserModule],
  });

  SwaggerModule.setup('api/swagger/users', app, userDocument);
}