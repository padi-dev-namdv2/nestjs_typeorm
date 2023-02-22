import { Module, NestModule, MiddlewareConsumer, RequestMethod, CacheModuleOptions } from '@nestjs/common';
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
import { AuthService } from './module/auth/auth.service';
import { UsersService } from './module/users/users.service';
import { User } from './module/users/entities/user.entity';
import { Role } from './module/auth/entities/role.entity';
import { Permission } from './module/auth/entities/permission.entity';
import { RolePermission } from './module/auth/entities/rolepermission.entity';
import { AuthGuard } from './guard/auth.guard';
import { DataSource } from 'typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksService } from './app/cronjobs/task.cronjob';
import { CacheModule } from '@nestjs/common';
import { HttpExceptionFilter } from './app/exceptions/filter.exception';
import { APP_FILTER } from '@nestjs/core';
import { Helper } from './ultils/helper.ultil';
import { CategoriesModule } from './module/categories/categories.module';
import { PagesModule } from './module/pages/pages.module';
import { PagesController } from './module/pages/pages.controller';
import { redisStore } from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import { ConfigService } from '@nestjs/config';
import { CacheStore } from '@nestjs/common';
import { Page } from './module/pages/entities/page.entity';
import { Category } from './module/categories/entities/category.entity';
import { Flaggedrev } from './module/categories/entities/flaggedrev.entity';
import { redisOptions } from './config/redis.config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { BlogModule } from './module/blog/blog.module';
import { DbValidatorsModule } from '@youba/nestjs-dbvalidator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env"
    }),
    TypeOrmModule.forFeature([User, Role]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'employees',
      entities: [User, Role, Permission, RolePermission, Category, Flaggedrev, Page],
      synchronize: false,
      cache: true,
    }),
    DbValidatorsModule.register({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'employees',
    }),
    UsersModule,
    AuthModule,
    ScheduleModule.forRoot(),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
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
    PagesModule,
    CategoriesModule,
    BlogModule
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
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkJwt)
      .exclude(
      { path: 'api/auth/login', method: RequestMethod.POST },
      { path: 'api/auth/register', method: RequestMethod.POST },
        //'auth/(.*)',
      )
      .forRoutes(AuthController, UsersController, PagesController);
  }
}
