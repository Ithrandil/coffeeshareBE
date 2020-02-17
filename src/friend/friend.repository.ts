import { from, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EntityRepository, Repository } from 'typeorm';
import { error } from 'util';

import { Friend } from './friend.entity';
import { CreateFriendDto } from './models/createFriend.dto';

@EntityRepository(Friend)
export class FriendRepository extends Repository<Friend> {
  findAll(transmitterId: string): Observable<Friend[]> {
    return from(this.find({ transmitterId }));
  }

  createFriend(friend: CreateFriendDto): Observable<any> {
    return from(this.save(friend));
  }

  updateFriend(id, friend: Friend): Observable<any> {
    return from(this.update(id, friend));
  }

  deleteFriend(id: string): Observable<any> {
    return from(this.delete(id));
  }

  findFriendByIds(transmitterId: string, receiverId: string): Observable<Friend> {
    return from(this.findOne({ transmitterId, receiverId })).pipe(
      catchError(sqlError => throwError(new error(sqlError))),
    );
  }
}
