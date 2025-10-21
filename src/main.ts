import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, RequestMethod, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/config.interface';

export const API_PREFIX = 'api';
export const API_DOCS_PREFIX = `${API_PREFIX}/docs`;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService<IAppConfig> = app.get(ConfigService);

  app.setGlobalPrefix(API_PREFIX, {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  const logger = new Logger('bootstrap');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = configService.get<number>('PORT', 3000);
  await app.listen(port);

  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(`Swagger documentation available at: http://localhost:${port}/${API_PREFIX}/docs`);
}
bootstrap();
