import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { Role } from '../auth/entities/role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueMailService } from '../../app/queues/producers/sendMail.producer';
import { SendMailConsumer } from '../../app/queues/consumers/sendMail.consumer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name:'process-mail-queue'
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, QueueMailService, SendMailConsumer],
  exports: [UsersService]
})
export class UsersModule {}
