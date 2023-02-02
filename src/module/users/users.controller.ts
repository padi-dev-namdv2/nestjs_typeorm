import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { BaseController } from 'src/app/controller/base.controller';
import { User } from './entities/user.entity';
import { QueueMailService } from '../../app/queues/producers/sendMail.producer'
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { fileUploadOptions } from 'src/config/imageOption.config';

@Controller('api/users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService,
    private readonly queueMailService: QueueMailService) {
    super();
  }

  @Post('/create')
  @UseInterceptors(FileInterceptor('avatar', fileUploadOptions('user')))
  create(@UploadedFile() avatar, @Body() createUserDto: CreateUserDto) {
    console.log(avatar);
    // return this.usersService.create(createUserDto);
  }

  @Get('/list')
  async findAll(@Res() res: Response, @Req() req: any) {
    const listUser = await this.usersService.findAll(req.query);

    return this.withData(res, listUser.result);
  }

  @Get('/use-query-builder')
  async getAllQueryBuilder(@Res() res: Response, @Req() req: any) {
    console.log("test");
    const listUser = await this.usersService.getAllQueryBuilder(req.query);

    return this.withData(res);
  }

  @Get('by-id/:id')
  async findOne(@Param('id') id: number, @Res() res: Response) {
    const user = this.usersService.findOne(id);

    return user ? this.withData(res, user) : this.notFound(res);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: number, @Res() res: Response) {
    const deleteUser = await this.usersService.remove(id);

    return deleteUser ? this.withData(res, '', 'Delete Success!') : this.notFound(res, 'Not Found!');
  }

  @Get('/send-mail-test')
  async sendMailTest(@Res() res: Response) {
    await this.queueMailService.sendMailTest("kakitani2000@gmail.com", "Chào bạn!Tôi đang test mail");
    return this.withData(res);
  }
}
