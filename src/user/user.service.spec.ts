import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './user.repository';
import { User } from 'dist/src/user/user.entity';
import { of } from 'rxjs';
import { UserService } from './user.service';
import { switchMap, tap } from 'rxjs/operators';
import { CreateUserDto } from './dto/create-user.dto';
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

const userNotInDB: User = {
  id: '123456789',
  firstName: 'MockedUserFirstName',
  lastName: 'MockedUserLastName',
  email: 'dont@exist',
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
            // findUserById: jest.fn(() => user$),
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
    it('should return an observable of false after calling userRepo', async () => {
      await userService.verifyUserNotExistByEmail('mocked@email.fr').pipe(
        tap(booleanParam => {
          expect(booleanParam).toEqual(false);
        }),
      );
      expect(userRepo.findUserByEmail).toHaveBeenCalledWith('mocked@email.fr');
    });
    it('should return an observable of true after calling userRepo', async () => {
      await userService.verifyUserNotExistByEmail('mocked@email.fr').pipe(
        tap(booleanParam => {
          expect(booleanParam).toEqual(true);
        }),
      );
      expect(userRepo.findUserByEmail).toHaveBeenCalledWith('mocked@email.fr');
    });
  });

  describe('createUser', () => {
    it('should return an Observable<User>', async () => {
      jest.spyOn(userService, 'verifyUserNotExistByEmail').mockImplementationOnce(() => of(true));
      await userService.createUser(createUserDto).pipe(
        tap(newUser => {
          expect(newUser).toHaveProperty('id');
          // FIXME: FINISH ASSERT, SEARCH POSSIBLE USAGE OF FULL OBJECT TESTING IN ONE TIME
          // expect();
        }),
      );
    });
  });

  // Model UT
  //   describe('', () => {
  //       it('', async () => {
  //           expect();
  //       });
  //   });
});
