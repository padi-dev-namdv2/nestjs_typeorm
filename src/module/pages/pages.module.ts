import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { Page } from './entities/page.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';
import { Helper } from '../../ultils/helper.ultil';

@Module({
  imports: [
    TypeOrmModule.forFeature([Page, Category]),
  ],
  controllers: [PagesController],
  providers: [PagesService, Helper]
})
export class PagesModule {}
