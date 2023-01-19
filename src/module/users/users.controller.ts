import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { BaseController } from 'src/app/controller/base.controller';
import { User } from './entities/user.entity';

@Controller('api/users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(@Res() res: Response, @Req() req: any) {
    const listUser = await this.usersService.findAll(req.query);

    return this.withData(res, listUser.result);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const user = this.usersService.findOne(id);

    return user ? this.withData(res, user) : this.notFound(res);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    const deleteUser = await this.usersService.remove(id);

    return deleteUser ? this.withData(res, '', 'Delete Success!') : this.notFound(res, 'Not Found!');
  }
}
