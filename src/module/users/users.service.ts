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
      select: ["id", "name", 'email', 'created_at'],
      relations: ["role"],
      take: limitRow,
      skip: offset
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

    return deleteUser.affected;
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({
      select: ["id", "email", "name", "roleId", "password"],
      where: {
        email: email
      }
    });
  }
}
