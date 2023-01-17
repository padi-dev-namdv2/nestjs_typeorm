import { Injectable, Res, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Response } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private readonly usersRepository: Repository<User>,) {
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(params: any) {
    const limitRow = 5;
    const offset = params.page ? (params.page - 1) * limitRow : 0;
    const listUser = await this.usersRepository.findAndCount({
      select: ["id", "name", 'email', "role_id", 'created_at'],
      take: limitRow,
      skip: offset
    });

    const data = {
      listUsers: listUser,
      currentPage: params.page ?? 1
    };

    return {result: data, message: 'Lấy dữ liệu thành công'};
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      select: ["id", "email", "name", "role_id", "password"],
      where: {
        email: email
      }
    });
  }
}
