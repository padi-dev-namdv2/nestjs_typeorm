import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueMailService } from '../../app/queues/producers/sendMail.producer';
import { SendMailConsumer } from '../../app/queues/consumers/sendMail.consumer';
import { BullModule } from '@nestjs/bull';
import { MulterModule } from '@nestjs/platform-express/multer';
import { imageUploadOptions } from 'src/config/imageOption.config';
import { Helper } from 'src/ultils/helper.ultil';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_POST ? parseInt(process.env.REDIS_POST) : undefined,
        password: process.env.REDIS_PASSWORD
      },
    }),
    BullModule.registerQueue({
      name: 'process-mail-queue'
    }),
    MulterModule.register(imageUploadOptions('user'))
  ],
  controllers: [UsersController],
  providers: [UsersService, QueueMailService, SendMailConsumer, Helper],
  exports: [UsersService]
})
export class UsersModule { }
