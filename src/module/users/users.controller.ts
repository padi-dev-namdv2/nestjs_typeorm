import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Req, Put, UploadedFile, UploadedFiles, UseInterceptors, Headers } from '@nestjs/common';
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
import { HttpExceptionFilter } from 'src/app/exceptions/filter.exception';
import { UseFilters } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { ParseFilePipe } from '@nestjs/common';
import { MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express/multer';
import { ExcelService } from 'src/app/excel/export/user.export';
import { excelUploadOptions } from 'src/config/excel.config';
import { ImportUser } from 'src/app/excel/import/user.import';
import path, { join } from 'path';
import { ParseIntPipe } from '@nestjs/common';

@Controller('api/users')
export class UsersController extends BaseController {
  constructor(private readonly usersService: UsersService,
    private readonly queueMailService: QueueMailService,
    private excelService: ExcelService,
    private importUser: ImportUser) {
    super();
  }

  @Post('/create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'avatars', maxCount: 10 },
    { name: 'thumb', maxCount: 1 }
  ]))
  create(@UploadedFiles() files: { avatar?: Express.Multer.File[], thumb?: Express.Multer.File }, @Body() createUserDto: CreateUserDto) {
    console.log(files.thumb[0].path);
    throw new HttpException('File is not allowed!', HttpStatus.INTERNAL_SERVER_ERROR);
    return this.usersService.create(createUserDto);
  }

  @Get('/list')
  async findAll(@Res() res: Response, @Req() req: any) {
    const listUser = await this.usersService.findAll(req.query);
    // throw new HttpException('File is not allowed!', HttpStatus.INTERNAL_SERVER_ERROR);
    // return this.withData(res, listUser.result);
  }

  @Get('/use-query-builder')
  async getAllQueryBuilder(@Res() res: Response, @Req() req: any) {
    console.log("test");
    const listUser = await this.usersService.getAllQueryBuilder(req.query);

    return listUser.result ? this.withData(res, listUser.result) : this.clientError(res);
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
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const deleteUser = await this.usersService.remove(id);

    return deleteUser.result ? this.withData(res, '', 'Delete Success!') : this.notFound(res, 'Not Found!');
  }

  @Get('/send-mail-test')
  async sendMailTest(@Res() res: Response) {
    await this.queueMailService.sendMailTest("kakitani2000@gmail.com", "Ch??o b???n!T??i ??ang test mail");
    return this.withData(res);
  }

  @Get('/export-user')
  async exportExcel(@Res() res: Response) {
    const result = await this.excelService.userExport();
    
    console.log(result);
    return res.download(`${result}`);
  }

  @Post('/import-user')
  @UseInterceptors(FileInterceptor('file', excelUploadOptions()))
  async importUserExcel(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    const importExcel = await this.importUser.importUser(file.path);

    return importExcel.result ? this.withData(res, importExcel.message) : this.clientError(res, importExcel.message);
  }
}
