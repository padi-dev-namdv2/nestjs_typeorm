import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Category } from './entities/category.entity';
import { Page } from '../pages/entities/page.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Page, Category]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService]
})
export class CategoriesModule {}
