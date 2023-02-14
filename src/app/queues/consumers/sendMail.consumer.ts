import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
// import { transporter } from 'src/config/configMail.config';
// import nodemailer from "nodemailer";

@Processor('process-mail-queue')
export class SendMailConsumer {
  @Process('sendMailTest')
  async sendMailTest(job: Job<unknown>) {
    console.log(job.data['content']);

    return {};
  }
}