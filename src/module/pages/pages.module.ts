import { Module } from '@nestjs/common';
import { PagesService } from './pages.service';
import { PagesController } from './pages.controller';
import { Page } from './entities/page.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Page, Category]),
  ],
  controllers: [PagesController],
  providers: [PagesService]
})
export class PagesModule {}
