import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { BaseController } from 'src/app/controller/base.controller';
import { Response } from 'express';
import * as jwt from "jsonwebtoken";
import { CreateRoleDto } from './dto/create-role.dto';

@Controller('api/auth')
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
  async logout(@Res() res: Response, @Req() req: Request) {
    const token = req.headers["x-api-key"];
      res.clearCookie('x-api-key');
      
      return this.withData(res, '', 'Logout Success!');
  }

  @Get('roles')
  async listRoles(@Res() res: Response, @Req() req: any) {
    const listRoles = await this.authService.listRoles(req.query);

    return this.withData(res, listRoles);
  }

  @Post('add-role')
  async addRole(@Body() createRoleDto: CreateRoleDto, @Res() res: Response) {
    // const addRole = await this.authService.addRole(createRoleDto);

    return this.withData(res);
  }
}
