import { JwtService } from '@nestjs/jwt';
import { Injectable, HttpStatus } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtPayload } from './models/jwt-payload.interface';
import { Observable, of } from 'rxjs';
import { LoginIdentifiersDto } from './models/login-identifiers.dto';
import { switchMap } from 'rxjs/operators';
import { AppException } from '../errors/app.exception';
import { ErrorCode } from '../errors/error-code.model';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  /**
   * @description Generate JWT if identifiers are correct
   * @param identifiers Email and password
   * @returns A JWT or an error if wrong identifiers
   */
  signIn(identifiers: LoginIdentifiersDto): Observable<any> {
    return this.userService.findOneByEmail(identifiers.email).pipe(
      switchMap(userFromDB => {
        if (userFromDB) {
          if (userFromDB.password === identifiers.password) {
            const user: JwtPayload = { email: userFromDB.email, id: userFromDB.id };
            return of(this.jwtService.sign(user));
          } else {
            throw new AppException('Wrong identifiers', HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
          }
        } else {
          throw new AppException('Wrong identifiers', HttpStatus.UNAUTHORIZED, ErrorCode.UNAUTHORIZED);
        }
      }),
    );
  }

  validateUser(payload: JwtPayload): Observable<User> {
    return this.userService.findOneByEmail(payload.email);
  }
}
