import type { FastifyCookieOptions } from '@fastify/cookie';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookie from '@fastify/cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.register(<any>cookie, {
    secret: process.env.COOKIE_SECRET || 'secret',
  } as FastifyCookieOptions);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
