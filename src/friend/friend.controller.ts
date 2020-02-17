import { Body, Controller, Post } from '@nestjs/common';
import { Observable } from 'rxjs';

import { FriendService } from './friend.service';
import { CreateFriendDto } from './models/createFriend.dto';
import { FriendDto } from './models/friend.dto';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}
  @Post()
  createFriend(@Body() newFriend: CreateFriendDto): Observable<FriendDto> {
    return this.friendService.createFriend(newFriend);
  }
}
