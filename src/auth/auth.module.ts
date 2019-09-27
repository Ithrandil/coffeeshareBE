import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt-strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      // FIXME: WILL NEED TO BE MOVED TO ENV CONFIG FILE
      secret: 'Supercalifragilisticexpialidocious',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
