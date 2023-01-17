import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { BaseController } from 'src/app/controller/base.controller';
import { Response } from 'express';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('login')
  async login(@Body() loginAuthDto: LoginAuthDto, @Res() res: Response) {
    let login = await this.authService.login(loginAuthDto);

    return !login.result ? this.clientError(res, login.message) : this.withData(res, login.result);
  }

  @Post('register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Post('logout')
  logout() {
    
  }
}
