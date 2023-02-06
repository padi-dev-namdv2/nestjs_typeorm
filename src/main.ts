import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const bodyParser = require('body-parser');
import { HttpExceptionFilter } from './app/exceptions/filter.exception';
const express = require('express');
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  // app.useGlobalFilters(new HttpExceptionFilter());
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use("/upload", express.static("upload"));
  await app.listen(3001);
}
bootstrap();
