import { Injectable, HttpStatus } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AppException } from '../errors/app.exception';
import { ErrorCode } from '../errors/error-code.model';
import { LoginIdentifiersDto } from './dto/login-identifiers.dto';
import * as jwt from 'jsonwebtoken';

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
  createUser(newUser: CreateUserDto): Observable<User> {
    return this.verifyUserNotExistByEmail(newUser.email).pipe(
      switchMap(doNotExist => {
        if (doNotExist) {
          return this.userRepo.createUser(newUser);
        } else {
          throw new AppException(
            'A user with this email already exists',
            HttpStatus.BAD_REQUEST,
            ErrorCode.USER_ALREADY_EXISTS,
          );
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
  getUserById(userId: string): Observable<User> {
    return this.userRepo.findUserById(userId).pipe(
      switchMap(user => {
        if (user) {
          return this.userRepo.findUserById(userId);
        } else {
          throw new AppException(
            'There is no user with this UUID in our database',
            HttpStatus.BAD_REQUEST,
            ErrorCode.USER_DOESNT_EXIST,
          );
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
  updateUser(updatedUser: User, userId: string): Observable<UpdateResult> {
    return this.userRepo.findUserById(userId).pipe(
      switchMap(user => {
        if (user) {
          return this.userRepo.updateUser(userId, updatedUser);
        } else {
          throw new AppException(
            'There is no user with this UUID in our database',
            HttpStatus.BAD_REQUEST,
            ErrorCode.USER_DOESNT_EXIST,
          );
        }
      }),
    );
  }

  /**
   * @description Generate JWT if identifiers are correct
   * @param identifiers Email and password
   * @returns A JWT or an error if wrong identifiers
   */
  loginUser(identifiers: LoginIdentifiersDto): Observable<any> {
    return this.findOneByEmail(identifiers.email).pipe(
      switchMap(userFromDB => {
        if (userFromDB) {
          if (userFromDB.password === identifiers.password) {
            const jwtBearerToken = jwt.sign({}, 'testForJWT', {
              algorithm: 'HS256',
              expiresIn: 12000,
              subject: userFromDB.id,
            });
            return of(jwtBearerToken);
          } else {
            throw new AppException('Wrong identifiers', HttpStatus.BAD_REQUEST, ErrorCode.BAD_REQUEST);
          }
        } else {
          throw new AppException(`User doesn't exists`, HttpStatus.BAD_REQUEST, ErrorCode.USER_DOESNT_EXIST);
        }
      }),
    );
  }

  /**
   * @description Delete a user in the DB by his UUID
   * @param userId of type string
   * @returns A DeleteResult describing the changes on DB or an observable of string if the user doesn't exists
   */
  deleteUser(userId: string): Observable<DeleteResult> {
    return this.userRepo.findUserById(userId).pipe(
      switchMap(user => {
        if (user) {
          return this.userRepo.deleteUser(userId);
        } else {
          throw new AppException(
            'There is no user with this UUID in our database',
            HttpStatus.BAD_REQUEST,
            ErrorCode.USER_DOESNT_EXIST,
          );
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
