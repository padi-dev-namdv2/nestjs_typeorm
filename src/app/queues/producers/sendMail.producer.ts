import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { mainOptionsEmail } from 'src/config/templateMail.config';
 
@Injectable()
export class QueueMailService {
  constructor(@InjectQueue('process-mail-queue') private queue: Queue) {}
 
  async sendMailTest(email:string, message : string) {
    await this.queue.add('sendMailTest',
    {
      content: mainOptionsEmail(email, message)
    }, 
    { 
      delay: 3000,
      removeOnFail: true,
      removeOnComplete: true
    });
  }
}