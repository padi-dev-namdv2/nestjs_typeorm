import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");
import config from "../../../src/config/index.config";
import { Role } from './entities/role.entity';
import { AppDataSource } from 'typeOrm.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>) {
  }

  async login(loginAuthDto: LoginAuthDto) {
    const checkEmptyUser = await this.usersService.findByEmail(loginAuthDto.email);
    if (!checkEmptyUser) {
      return {result: false, message: 'Email is not empty!'};
    }

    const checkPassword: boolean = await bcrypt.compare(loginAuthDto.password, checkEmptyUser.password);
    if (!checkPassword) {
      return {result: false, message: 'Password wrong!'};
    }

    const token = jwt.sign(  //Sing JWT, valid for 1 hour
        { id: checkEmptyUser.id, name: checkEmptyUser.name, email: checkEmptyUser.email },
        config.jwtSecret,
        { expiresIn: "1h" }
    );
    
    const data: object = {
      profile: checkEmptyUser,
      token: token
    }

    return {result: data, message: 'Login success!'};
  }

  register(registerAuthDto: RegisterAuthDto) {
    return `This action returns all auth`;
  }

  async listRoles(params: any) {
    const limitRow = 5;
    const offset: number = params.page ? (params.page - 1) * limitRow : 0;
    const roles = await this.rolesRepository.findAndCount({
      select: ["id", "name"],
      take: limitRow,
      skip: offset
    })

    const data = {
      listRoles: roles,
      currentPage: params.page ?? 1
    };

    return {result: data, message: 'List roles!' };
  }

  async addRole(params: any) {
    const queryRunner = AppDataSource.createQueryRunner();
    console.log(params);
    // await queryRunner.startTransaction();
    // try {

    // } catch (err) {

    // }
  }
}
