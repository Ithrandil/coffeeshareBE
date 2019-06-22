import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, EntityRepository } from 'typeorm';
import { Observable, from, throwError, of } from 'rxjs';
import { UserDto } from './dto/user.dto';
import { catchError } from 'rxjs/operators';
import { error } from 'util';
import { CreateUserDto } from './dto/create-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findAll(): Observable<User[]> {
    return from(this.find());
  }

  createUser(user: CreateUserDto): Observable<any> {
    return from(this.save(user));
  }

  updateUser(id: string, user: User): Observable<any> {
    return from(this.update(id, user));
  }

  deleteUser(id: string): Observable<any> {
    return from(this.delete(id));
  }

  findUserByEmail(email: string): Observable<User> {
    return from(this.findOne({ email })).pipe(catchError(sqlError => throwError(new error(sqlError))));
  }

  findUserById(id: string): Observable<User> {
    return from(this.findOne(id));
  }
}
