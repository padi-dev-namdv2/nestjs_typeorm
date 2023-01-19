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
import { AuthService } from './module/auth/auth.service';
import { UsersService } from './module/users/users.service';
import { User } from './module/users/entities/user.entity';
import { Role } from './module/auth/entities/role.entity';
import { Permission } from './module/auth/entities/permission.entity';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nestjs_learn',
      entities: [User, Role, Permission],
      synchronize: false,
      cache: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService, 
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }],
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
      .forRoutes(AuthController, UsersController);
  }
}
