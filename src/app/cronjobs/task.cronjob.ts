import { Injectable, Logger, Inject } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(@Inject('winston')
    private readonly logger: Logger) {
  }

  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'test-cron',
    // timeZone: 'Asia/Ho_Chi_Minh'
  })
  testCron() {
    this.logger.debug('Called when the current second is 45');
    this.logger.error('The transaction failed.');
    this.logger.warn("ahiyhi");
    this.logger.verbose('test');
    this.logger.log('info', 'test21425');
    this.logger.log('info', 'test21425');
  }
}