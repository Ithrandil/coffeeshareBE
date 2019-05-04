import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository){}

  /**
   * @description Check if the user exist in the DB
   * @param email of type string taken from the user
   * @returns An observable of a boolean
   */
  verifyUserNotExistByEmail(email: string): Observable<boolean> {
    return this.userRepo.findUserByEmail(email).pipe(
        switchMap(user => {
            if (user) { return of(false);} else {
            return of(true);}
        }),
    );
  }

  /**
   * @description Check of existence of the user by his email then if not create it in the DB
   * @param newUser of type User
   * @returns An observable of a User or an observable of string if the user already exists
   */
  createUser(newUser: User): Observable<User | string> {
    return this.verifyUserNotExistByEmail(newUser.email).pipe(
        switchMap((notexist) => {
            if (notexist) {return this.userRepo.createUser(newUser);} else {
            return of('This mail is already used');}
        }),
    );
  }

  /**
   * @description Get all users on the DB
   * @returns An observable of an array of Users
   */
    getAllUsers(): Observable<User[]> {
        return this.userRepo.findAll();
    }

    /**
     * @description Get a specific user by his UUID in the DB
     * @param userId of type string
     * @returns An observable of a User
     */
    getUserById(userId: string): Observable<User> {
        return this.userRepo.findUserById(userId);
    }

    // TODO: NEED TO TEST TO UNDERSTAND WHAT COMES BACK WITH TYPEORM AND REMOVE THE ANY TYPE
    /**
     * @description Update the user in the DB with his UUID
     * @param updatedUser of type User
     * @param userId of type string
     * @returns ???????
     */
    updateUser(updatedUser: User, userId: string): Observable<any> {
        return this.userRepo.updateUser(userId, updatedUser);
    }

    // TODO: NEED TO TEST TO UNDERSTAND WHAT COMES BACK WITH TYPEORM AND REMOVE THE ANY TYPE
    /**
     * @description Delete a user in the DB by his UUID
     * @param userId of type string
     * @returns ????????
     */
    deleteUser(userId: string): Observable<any> {
        return this.userRepo.deleteUser(userId);
    }

    /**
     * @description Get a user by his email in the DB
     * @param email of type string
     * @returns An observable of type User
     */
    findOneByEmail(email: string): Observable<User> {
        return this.userRepo.findUserByEmail(email);
    }

}
