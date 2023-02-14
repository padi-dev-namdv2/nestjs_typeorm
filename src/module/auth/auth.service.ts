import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');
import config from '../../../src/config/index.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    const checkEmptyUser = await this.usersService.findByEmail(
      loginAuthDto.email,
    );
    if (!checkEmptyUser) {
      return { result: false, message: 'Email is not empty!' };
    }

    const checkPassword: boolean = await bcrypt.compare(
      loginAuthDto.password,
      checkEmptyUser.password,
    );

    if (!checkPassword) {
      return { result: false, message: 'Password wrong!' };
    }

    const token = jwt.sign(
      {
        id: checkEmptyUser.id,
        name: checkEmptyUser.name,
        email: checkEmptyUser.email,
      },
      config.jwtSecret,
      { expiresIn: '1h' },
    );

    const data = {
      profile: checkEmptyUser,
      token: token,
    };

    return { result: data, message: 'Login success!' };
  }

  register(registerAuthDto: RegisterAuthDto) {
    return `This action returns all auth`;
  }
}
