import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './entities/page.entity';
import { Cache } from 'cache-manager';
import { CacheTTL } from '@nestjs/common';

@Injectable()
export class PagesService {
  constructor(@InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {

  }

  create(createPageDto: CreatePageDto) {
    return 'This action adds a new page';
  }

  @CacheTTL(2000)
  async findAll(params: any) {
    let key: string = 'list_user_page_' + params.page ?? '1';
    const limitRow = 30;
    const offset = params.page ? (params.page - 1) * limitRow : 0;
    const userCache = await this.cacheManager.get(key);
    
    if (userCache) {
      return { result: userCache, message: 'Get list pages success!' }
    }

    const listPages = await this.pageRepository.findAndCount({
      select: {
        id: true,
        pr_type: true,
        pr_title: true,
        created_at: true,
        categories: {
          id: true,
          cat_title: true,
          flaggedrevs: {
            id: true,
            fr_timestamp: true
          }
        }
      },
      relations: ["categories", "categories.flaggedrevs"],
      take: limitRow,
      skip: offset,
    })

    await this.cacheManager.set(key, listPages, 60 * 60);
    return { result: listPages, message: 'Get list pages success!' };
  }

  findOne(id: number) {
    return `This action returns a #${id} page`;
  }

  update(id: number, updatePageDto: UpdatePageDto) {
    return `This action updates a #${id} page`;
  }

  remove(id: number) {
    return `This action removes a #${id} page`;
  }
}
