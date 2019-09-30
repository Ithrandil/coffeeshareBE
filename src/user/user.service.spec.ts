import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';

import { AppException } from '../errors/app.exception';
import { ErrorCode } from '../errors/error-code.model';
import { User } from '../user/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

/********************************************************
 *                   Test variables
 *******************************************************/
const user: User = {
  id: '123456789',
  firstName: 'MockedUserFirstName',
  lastName: 'MockedUserLastName',
  email: 'mocked@email.fr',
  password: 'mockedUserPassword',
};

const createUserDto: CreateUserDto = {
  firstName: 'MockedCreateUserDtoFirstName',
  lastName: 'MockedCreateUserDtoLastName',
  email: 'mocked@email.fr',
  password: 'mockedCreateUserDtoPassword',
};

describe('UserService', () => {
  /********************************************************
   *                    Declarations
   *******************************************************/
  let userRepo: UserRepository;
  let userService: UserService;
  /********************************************************
   *      Module construction and services mocking
   *******************************************************/

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useFactory: () => ({
            findUserByEmail: jest.fn(paramEmail => {
              if (paramEmail === 'dont@exist') {
                return of(null);
              } else {
                return of(user);
              }
            }),
            createUser: jest.fn(() => of(user)),
            findAll: jest.fn(() => of([user, user])),
            findUserById: jest.fn(paramid => {
              if (paramid === '000000000') {
                return of(null);
              } else {
                return of(user);
              }
            }),
            updateUser: jest.fn(() => of('Im an update response from typeOrm')),
            deleteUser: jest.fn(() => of('Im a delete response from typeOrm')),
          }),
        },
      ],
    }).compile();
    userRepo = module.get(UserRepository);
    userService = module.get(UserService);
  });

  // Clear mocked function array for 'HaveBeenCalled' tests
  afterEach(jest.clearAllMocks);

  describe('verifyUserNotExistByEmail', () => {
    it('should call userRepo.findUserByEmail', () => {
      userService.verifyUserNotExistByEmail('mocked@email.fr').subscribe(() => {
        expect(userRepo.findUserByEmail).toHaveBeenCalledWith('mocked@email.fr');
      });
    });

    it('should call userRepo.findUserByEmail', () => {
      userService.verifyUserNotExistByEmail('dont@exist').subscribe(() => {
        expect(userRepo.findUserByEmail).toHaveBeenCalledWith('dont@exist');
      });
    });
  });

  describe('createUser', () => {
    it('should call userService.verifyUserNotExistByEmail', () => {
      jest.spyOn(userService, 'verifyUserNotExistByEmail').mockImplementationOnce(() => of(true));
      userService.createUser(createUserDto).subscribe(() => {
        expect(userService.verifyUserNotExistByEmail).toHaveBeenCalledWith('mocked@email.fr');
      });
    });

    it('should throw an Appexception & call userService.verifyUserNotExistByEmail', () => {
      jest.spyOn(userService, 'verifyUserNotExistByEmail').mockImplementationOnce(() => of(false));
      userService.createUser(createUserDto).subscribe(
        () => {},
        error => {
          expect(userService.verifyUserNotExistByEmail).toHaveBeenCalled();
          expect(error).toBeInstanceOf(AppException);
          expect(error.message).toBe('A user with this email already exists');
          expect(error.errorCode).toBe(ErrorCode.USER_ALREADY_EXISTS);
        },
      );
    });
  });

  describe('getAllUsers', () => {
    it('should call userRepo.findAll', () => {
      userService.getAllUsers().subscribe(() => {
        expect(userRepo.findAll).toHaveBeenCalled();
      });
    });
  });

  describe('getUserById', () => {
    it('should call userRepo.findUserById', () => {
      userService.getUserById('123456789').subscribe(() => {
        expect(userRepo.findUserById).toHaveBeenCalledWith('123456789');
      });
    });

    it('should throw an AppException & call userRepo.findUserById', () => {
      userService.getUserById('000000000').subscribe(
        () => {},
        error => {
          expect(userRepo.findUserById).toHaveBeenCalledWith('000000000');
          expect(error).toBeInstanceOf(AppException);
          expect(error.message).toBe('There is no user with this UUID in our database');
          expect(error.errorCode).toBe(ErrorCode.USER_DOESNT_EXIST);
        },
      );
    });
  });

  describe('updateUser', () => {
    it('should call userRepo.findUserById & .updateUser', () => {
      userService.updateUser(user, '123456789').subscribe(() => {
        expect(userRepo.findUserById).toHaveBeenCalledWith('123456789');
        expect(userRepo.updateUser).toHaveBeenCalledWith('123456789', user);
      });
    });

    it('should throw an AppException, call userRepo.findUserById and not .updateUser', () => {
      userService.updateUser(user, '000000000').subscribe(
        () => {},
        error => {
          expect(userRepo.findUserById).toHaveBeenCalledWith('000000000');
          expect(userRepo.updateUser).not.toHaveBeenCalledWith('000000000', user);
          expect(error).toBeInstanceOf(AppException);
          expect(error.message).toBe('There is no user with this UUID in our database');
          expect(error.errorCode).toBe(ErrorCode.USER_DOESNT_EXIST);
        },
      );
    });
  });

  describe('deleteUser', () => {
    it('should call userRepo.findUserById', () => {
      userService.deleteUser('123456789').subscribe(() => {
        expect(userRepo.findUserById).toHaveBeenCalledWith('123456789');
        expect(userRepo.deleteUser).toHaveBeenCalledWith('123456789');
      });
    });

    it('should throw an AppException and call userRepo.findUserById and not .deleteUser', () => {
      userService.deleteUser('000000000').subscribe(
        () => {},
        error => {
          expect(userRepo.findUserById).toHaveBeenCalledWith('000000000');
          expect(userRepo.deleteUser).not.toHaveBeenCalledWith('000000000');
          expect(error).toBeInstanceOf(AppException);
          expect(error.message).toBe('There is no user with this UUID in our database');
          expect(error.errorCode).toBe(ErrorCode.USER_DOESNT_EXIST);
        },
      );
    });
  });

  describe('findOneByEmail', () => {
    it('shoul call userRepo.findUserByEmail', () => {
      userService.findOneByEmail('mocked@email.fr').subscribe(() => {
        expect(userRepo.findUserByEmail).toHaveBeenCalledWith('mocked@email.fr');
      });
    });
  });
});
