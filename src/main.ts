import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const bodyParser = require('body-parser');
  const express = require('express');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
    }),
  );
  console.log(process.env.MYSQL_USER);
  app.use("/upload", express.static("upload"));
  await app.listen(3001);
}
bootstrap();
