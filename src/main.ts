import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.API_PORT || 3000;
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(port);

  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
