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
import { redisOptions } from './config/redis.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'employees',
      entities: [User],
      synchronize: false,
      cache: true,
    }),
    UsersModule,
    AuthModule,
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: redisOptions.host,
            port: redisOptions.post,
          },
          password: null,
          ttl: 60
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
    TasksService,
    Helper,
  ],
})
export class AppModule implements NestModule {
  constructor(private dataSource: DataSource) { }
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
