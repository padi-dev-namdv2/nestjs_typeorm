import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueMailService } from '../../app/queues/producers/sendMail.producer';
import { SendMailConsumer } from '../../app/queues/consumers/sendMail.consumer';
import { BullModule } from '@nestjs/bull';
import { MulterModule } from '@nestjs/platform-express/multer';
import { fileUploadOptions } from 'src/config/imageOption.config';
import { Helper } from 'src/ultils/helper.ultil';
import { redisOptions } from 'src/config/redis.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    BullModule.forRoot({
      redis: {
        host: redisOptions.host,
        port: redisOptions.post,
      },
    }),
    BullModule.registerQueue({
      name: 'process-mail-queue'
    }),
    MulterModule.register(fileUploadOptions('user'))
  ],
  controllers: [UsersController],
  providers: [UsersService, QueueMailService, SendMailConsumer, Helper],
  exports: [UsersService]
})
export class UsersModule { }
