import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './models/jwt-payload.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'Supercalifragilisticexpialidocious',
    });
  }

  validate(payload: JwtPayload): Observable<User> {
    return this.authService.validateUser(payload).pipe(
      map(user => {
        if (!user) {
          throw new UnauthorizedException();
        } else {
          return user;
        }
      }),
    );
  }
}
