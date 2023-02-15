import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as momentTimezone from 'moment-timezone';
const moment = require('moment-timezone');
import { AppDataSource } from 'typeOrm.config';

async function bootstrap() {
  await AppDataSource.initialize();
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
  
  moment.tz.setDefault("America/New_York");
  let now = new Date();
  console.log(now.toTimeString());
  app.use("/upload", express.static("upload"));
  await app.listen(3001);
}
bootstrap();
