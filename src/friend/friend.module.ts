import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FriendController } from './friend.controller';
import { Friend } from './friend.entity';
import { FriendRepository } from './friend.repository';
import { FriendService } from './friend.service';

@Module({
  imports: [TypeOrmModule.forFeature([Friend, FriendRepository])],
  controllers: [FriendController],
  providers: [FriendService],
  exports: [FriendService],
})
export class FriendModule {}
