import { Injectable, Res, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Brackets, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from '../auth/entities/role.entity';
import { Response } from '@nestjs/common';
import { IsNull, Not, In } from 'typeorm';
import { DataSource } from 'typeorm';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly usersRepository: Repository<User>,
  @InjectRepository(Role)
  private readonly roleRepository: Repository<Role>,
  private dataSource: DataSource) {
  }

  create(createUserDto: CreateUserDto) {
    // throw new HttpException('Not Fount', HttpStatus.NOT_FOUND);
    return 'hello user create new!';
  }

  async findAll(params: any) {
    const limitRow = 5;
    const offset = params.page ? (params.page - 1) * limitRow : 0;
    const listRole = await this.roleRepository.find({
      select: {
        id: true
      }
    });

    const listUser = await this.usersRepository.findAndCount({
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
        role: {
          name: true
        }
      },
      relations: {
        role: true
      },
      where: {
        roleId: In(listRole.map(function (item) {
          return item.id;
        }))
      },
      take: limitRow,
      skip: offset,
    });

    const data = {
      listUsers: listUser,
      currentPage: params.page ?? 1
    };

    return {result: data, message: 'Lấy dữ liệu thành công'};
  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({
      where: {
        id: id
      }
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const deleteUser = await this.usersRepository.delete(id);

    return { result: deleteUser.affected, message: 'Delete success'} ;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      select: ["id", "email", "name", "roleId", "password"],
      where: {
        email: email
      }
    });
  }

  async getAllQueryBuilder(params: any) {
    const limitRow = 5;
    const page = params.page ? (params.page - 1) * limitRow : 1;
    const testAVG = this.dataSource.getRepository(User)
      .createQueryBuilder("user")
      .select("AVG(user.roleId) as avg_roleId")
      .getQuery();

    console.log(testAVG);
    
    const listUser = await this.dataSource.getRepository(User)
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .leftJoinAndSelect("role.permissions", "permissions")
      .select(["user.id", "user.name", "user.email"])
      .addSelect(["role.id", "role.name"])
      .addSelect(['permissions.id', 'permissions.name', 'permissions.path', 'permissions.method'])
      .where('role.id is NOT NULL')
      .andWhere(
        new Brackets((query) => {
          query.where('role.name = :name1 OR role.name = :name2', 
            { name1: 'Blogger', name2: 'CTV' }
          )
        })
      )
      .skip((page - 1) * limitRow)
      .take(limitRow)
      .getManyAndCount();
    
    return { result: listUser, message: 'Get user success!' }
  }
}
