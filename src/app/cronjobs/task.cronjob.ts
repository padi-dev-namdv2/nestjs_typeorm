import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'test-cron',
    timeZone: 'Asia/Ho_Chi_Minh'
  })
  testCron() {
    console.log("test-cronjob");
    this.logger.debug('Called when the current second is 45');
  }
  
  @Cron(CronExpression.EVERY_10_SECONDS, {
    name: 'test-cron-new',
    timeZone: 'Asia/Ho_Chi_Minh'
  })
  testCronNew() {
    console.log("test-cronjob-new");
    this.logger.log("Called when the current second is 10")
  }
}