import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as momentTimezone from 'moment-timezone';
const moment = require('moment-timezone');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
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
  // dataSource.initialize();
  moment.tz.setDefault("America/New_York");
  let now = new Date();
  console.log(now.toTimeString());
  app.use("/upload", express.static("upload"));
  await app.listen(3001);
}
bootstrap();
