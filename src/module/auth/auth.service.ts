import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as jwt from 'jsonwebtoken';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly usersService: UsersService,
  ) {}

  async login(loginAuthDto: LoginAuthDto) {
    // await this.usersRepository.softDelete(34);
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
      process.env.JWT_SECRET,
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
