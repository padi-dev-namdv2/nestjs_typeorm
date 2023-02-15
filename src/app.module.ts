import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { checkJwt } from './middleware/checkJwt.middleware';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { AuthController } from './module/auth/auth.controller';
import { UsersController } from './module/users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { User } from './module/users/entities/user.entity';
import { AuthGuard } from './guard/auth.guard';
import { DataSource } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './app/cronjobs/task.cronjob';
import { CacheModule } from '@nestjs/common';
import { Helper } from './ultils/helper.ultil';
import { redisStore } from 'cache-manager-redis-store';
import { ConfigService } from '@nestjs/config';
import { CacheStore } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler'
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
const path = require("path");
import { AppDataSource } from 'typeOrm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_POST ? parseInt(process.env.MYSQL_POST) : undefined,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_ROOT_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      entities: [User],
      synchronize: false,
      cache: true,
      autoLoadEntities: true
    },),
    UsersModule,
    AuthModule,
    ScheduleModule.forRoot(),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp({format:'HH:mm:ss DD-MM-YYYY'}),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({
          dirname: path.join(__dirname, '../log/'), 
          filename: 'log.log',
          level: 'debug',
        })
      ],
    }),
    ThrottlerModule.forRoot({
      ttl: process.env.THROTTLER_TTL ? parseInt(process.env.THROTTLER_TTL) : undefined,
      limit: process.env.THROTTLER_LIMIT ? parseInt(process.env.THROTTLER_LIMIT) : undefined,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_POST ? parseInt(process.env.REDIS_POST) : undefined,
          },
          password: process.env.REDIS_PASSWORD,
          ttl: process.env.REDIS_TTL ? parseInt(process.env.REDIS_TTL) : 0
        });
        return {
          store: store as unknown as CacheStore,
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },    
    TasksService,
    Helper,
    // {
    //   provide: DataSource,
    //   useFactory: async () => {
    //     await AppDataSource.initialize();
    //     return AppDataSource;
    // },
    // }
  ],
  // exports: [DataSource]
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) {
    // AppDataSource.initialize();
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkJwt)
      .exclude(
        { path: 'api/auth/login', method: RequestMethod.POST },
        { path: 'api/auth/register', method: RequestMethod.POST },
        //'auth/(.*)',
      )
      .forRoutes(AuthController, UsersController);
  }
}
