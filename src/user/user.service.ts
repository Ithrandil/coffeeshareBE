import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepo: UserRepository,
  ) {}

  /**
   * @description Check if the user exist in the DB
   * @param email of type string taken from the user
   * @returns An observable of a boolean
   */
  verifyUserNotExistByEmail(email: string): Observable<boolean> {
    return this.userRepo.findUserByEmail(email).pipe(
      switchMap(user => {
        if (user) {
          return of(false);
        } else {
          return of(true);
        }
      }),
    );
  }

  /**
   * @description Check of existence of the user by his email then if not create it in the DB
   * @param newUser of type User
   * @returns An observable of a User or an observable of string if the user already exists
   */
  createUser(newUser: CreateUserDto): Observable<User | string> {
    return this.verifyUserNotExistByEmail(newUser.email).pipe(
      switchMap(doNotExist => {
        if (doNotExist) {
          return this.userRepo.createUser(newUser);
        } else {
          return of('This mail is already used');
        }
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
   * @returns An observable of a User or an observable of string if the user doesn't exists
   */
  getUserById(userId: string): Observable<User | string> {
    return this.userRepo.findUserById(userId).pipe(
      switchMap(user => {
        if (user) {
          return this.userRepo.findUserById(userId);
        } else {
          return of('There is no user with this uuid in our database');
        }
      }),
    );
  }

  /**
   * @description Update the user in the DB with his UUID
   * @param updatedUser of type User
   * @param userId of type string
   * @returns An object describing the changes on DB or an observable of string if the user doesn't exists
   */
  updateUser(updatedUser: User, userId: string): Observable<UpdateResult | string> {
    return this.userRepo.findUserById(userId).pipe(
      switchMap(user => {
        if (user) {
          return this.userRepo.updateUser(userId, updatedUser);
        } else {
          return of('There is no user with this uuid in our database');
        }
      }),
    );
  }

  /**
   * @description Delete a user in the DB by his UUID
   * @param userId of type string
   * @returns A DeleteResult describing the changes on DB or an observable of string if the user doesn't exists
   */
  deleteUser(userId: string): Observable<DeleteResult | string> {
    return this.userRepo.findUserById(userId).pipe(
      switchMap(user => {
        if (user) {
          return this.userRepo.deleteUser(userId);
        } else {
          return of('There is no user with this uuid in our database');
        }
      }),
    );
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
