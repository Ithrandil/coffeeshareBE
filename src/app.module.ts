import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { FriendController } from './friend/friend.controller';
import { FriendModule } from './friend/friend.module';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(), AuthModule, FriendModule],
  controllers: [AppController, FriendController],
  providers: [AppService],
})
export class AppModule {}
