import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

    getAllUsers(): Observable<UserDto[]> {
        return;
    }

    getUserById(userId: number): Observable<UserDto> {
        return;
    }

    updateUser(updatedUser: User, userId: number): string {
        return;
    }

    createUser(newUser: User): string {
        return;
    }

    deleteUser(userId: number): string {
        return;
    }

    findOneByEmail(email: string): User {
        return;
    }

}
