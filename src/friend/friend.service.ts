import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FriendRepository } from './friend.repository';
import { CreateFriendDto } from './models/createFriend.dto';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(FriendRepository)
    private readonly friendRepo: FriendRepository,
  ) {}

  createFriend(newFriend: CreateFriendDto) {
    return this.friendRepo.createFriend(newFriend);
  }
}
