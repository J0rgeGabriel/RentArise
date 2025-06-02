import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ProductModule } from "src/app/product/product.module";

export function setupProductSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('RentArise Products API')
    .setDescription('Endpoints related to product management')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [ProductModule],
  });

  SwaggerModule.setup('api/swagger/products', app, document);
}