import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const bodyParser = require('body-parser');
import { HttpExceptionFilter } from './app/exceptions/filter.exception';
const express = require('express');
import * as session from 'express-session';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { createConnection } from 'typeorm';
import { Role } from './module/auth/entities/role.entity';
import { User } from './module/users/entities/user.entity';
import { Permission } from './module/auth/entities/permission.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await createConnection({
    // name: 'default',
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "employees",
    synchronize: false,
    logging: false,
    entities: [
      Role, User, Permission
    ],
  });
  // app.useGlobalPipes(new ValidationPipe());
  // app.enableCors();
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: false }));
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
