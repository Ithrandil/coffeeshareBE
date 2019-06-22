import { Controller, Get, Param, Body, Post, Delete, Patch, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Observable } from 'rxjs';
import { UserDto } from './dto/user.dto';
import {
  ApiUseTags,
  ApiOperation,
  ApiImplicitParam,
  ApiResponse,
  ApiResponseModelProperty,
  ApiOkResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { DeleteResult, UpdateResult } from 'typeorm';

@ApiUseTags('users')
@Controller('users')
@UseInterceptors(new TransformInterceptor(UserDto))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ title: 'Get all users' })
  @ApiOkResponse({ description: 'Successful operation', type: [UserDto, UserDto] })
  getAllUsers(): Observable<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @ApiOperation({ title: 'Get of a specific user with his UUID' })
  @ApiImplicitParam({ name: 'id', description: `User's UUID`, required: true, type: 'string' })
  @ApiOkResponse({ description: 'Successful operation', type: UserDto })
  @ApiBadRequestResponse({
    description: 'There is no user with this UUID in our database',
  })
  getById(@Param() id: string): Observable<User> {
    return this.userService.getUserById(id);
  }

  @Post()
  @ApiOperation({ title: 'User creation' })
  @ApiOkResponse({ description: 'Successful operation', type: UserDto })
  @ApiBadRequestResponse({
    description: 'A user with this email already exists',
  })
  createUser(@Body() newUser: CreateUserDto): Observable<UserDto> {
    return this.userService.createUser(newUser);
  }

  @Patch(':id')
  @ApiOperation({ title: 'User update' })
  @ApiImplicitParam({ name: 'id', description: `User's UUID`, required: true, type: 'string' })
  @ApiOkResponse({ description: 'Successful operation', type: UpdateResult })
  @ApiBadRequestResponse({
    description: 'There is no user with this UUID in our database',
  })
  updateUser(@Body() updatedUser: User, @Param() id: string): Observable<UpdateResult> {
    return this.userService.updateUser(updatedUser, id);
  }

  @Delete(':id')
  @ApiOperation({ title: 'User deletion' })
  @ApiImplicitParam({ name: 'id', description: `User's UUID`, required: true, type: 'string' })
  @ApiOkResponse({ description: 'Successful operation', type: DeleteResult })
  @ApiBadRequestResponse({
    description: 'There is no user with this UUID in our database',
  })
  deleteUser(@Param() id): Observable<DeleteResult> {
    return this.userService.deleteUser(id);
  }
}
