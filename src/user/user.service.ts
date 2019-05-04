import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository){}

  // *****************************
  // Check if the user exist in MYSQL DB
  // *****************************
  verifyUserNotExistByEmail(email: string): Observable<boolean> {
    return this.userRepo.findUserByEmail(email).pipe(
        switchMap(user => {
            if (user) return of(false);
            else return of(true);
        })
    )
  }

  // *****************************
  // Creation of a user in into MYSQL DB
  // *****************************
  createUser(newUser: User): Observable<User | string> {
    return this.verifyUserNotExistByEmail(newUser.email).pipe(
        switchMap((notexist) => {
            if (notexist) return this.userRepo.createUser(newUser);
            else return of('This mail is already used');
        })
    )
  }

    getAllUsers(): Observable<UserDto[]> {
        return;
    }

    getUserById(userId: number): Observable<UserDto> {
        return;
    }

    updateUser(updatedUser: User, userId: number): string {
        return;
    }

    deleteUser(userId: number): string {
        return;
    }

    findOneByEmail(email: string): User {
        return;
    }

}
