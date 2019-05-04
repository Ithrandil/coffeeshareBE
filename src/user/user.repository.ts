import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { Observable, from, throwError } from "rxjs";
import { UserDto } from "./dto/user.dto";
import { catchError } from "rxjs/operators";
import { error } from "util";
import { CreateUserDto } from "./dto/create-user.dto";

export class UserRepository {

    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>) {}

    findAll(): Observable<User[]> {
        return from(this.userRepo.find());
      }

    createUser(user: CreateUserDto): Observable<any> {
        return from(this.userRepo.save(user));
    }

    updateUser(id: string, user: User): Observable<any> {
    return from(this.userRepo.update(id, user));
    }

    deleteUser(id: string): Observable<any> {
        return from(this.userRepo.delete(id));
    }

    findUserByEmail(email: string): Observable<User> {
        return from(this.userRepo.findOne( {email} )).pipe(
            catchError(sqlError => throwError(new error(sqlError))),
          );
    }

    findUserById(id: string): Observable<User> {
        return from(this.userRepo.findOne( id ));
    }
}
