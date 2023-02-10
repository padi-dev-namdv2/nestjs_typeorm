import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { BaseController } from '../../app/controller/base.controller';
import { Response, Request } from 'express';

@Controller('api/pages')
export class PagesController extends BaseController {
  constructor(private readonly pagesService: PagesService) {
    super();
  }

  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get('find-all')
  async findAll(@Res() res: Response, @Req() req: Request) {
    const listPages = await this.pagesService.findAll(req.query);

    return this.withData(res, listPages.result);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(+id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(+id);
  }
}
