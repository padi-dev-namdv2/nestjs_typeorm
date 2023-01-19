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
import { RolePermission } from './entities/rolepermission.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly usersService: UsersService,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>) {
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
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const role = this.rolesRepository.create({
        name: params.name
      })
      // await this.rolesRepository.save(role);
      await queryRunner.manager.save(role);
      // console.log(params.list_permissions);
      if (Object.keys(params.list_permissions).length) {
        const rolePermissions = Object(params.list_permissions).map(async function (item: number) {
          const rolepermissions = this.rolePermissionRepository.create({
            roleId: role.id,
            permissionId: item
          })

          await queryRunner.manager.save(rolePermissions);
        });

        // const rolepermissions = this.rolePermissionRepository.create(rolePermissions);
        // Object.keys(rolePermissions).forEach(async function (index) {
        //   
        // })
      }
      await queryRunner.commitTransaction()
      return {result: true, message: 'Create success!'};
    } catch (err) {
      await queryRunner.rollbackTransaction();
      console.log(err);
      return {result: false, message: 'Create fail!'};
    }
  }
}
