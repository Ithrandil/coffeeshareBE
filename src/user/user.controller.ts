import { Controller, Get, Put, Param, Body, Post, Delete, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Observable } from 'rxjs';
import { UserDto } from './user.dto';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // TODO: Implement UserDTO for the return to the client instead of a User

    // @UseGuards(AuthGuard())
    @Get()
    @ApiOperation({title: 'Get all users'})
    getAllUsers(): Observable<UserDto[]> {
        return this.userService.getAllUsers();
    }

    // @UseGuards(AuthGuard())
    @Get(':id')
    @ApiOperation({title: 'Get of a specific user with his UUID'})
    getById(@Param() id: string): Observable<UserDto> {
        return this.userService.getUserById(id);
    }

    @Post()
    @ApiOperation({title: 'User creation'})
    createUser(@Body() newUser: User): Observable<string | User> {
        return this.userService.createUser(newUser);
    }

    // @UseGuards(AuthGuard())
    @Patch(':id')
    @ApiOperation({title: 'User update'})
    updateUser(@Body() updatedUser: User, @Param() id: string): Observable<string> {
        return this.userService.updateUser(updatedUser, id);
    }

    // @UseGuards(AuthGuard())
    @Delete(':id')
    @ApiOperation({title: 'User deletion'})
    deleteUser(@Param() id): Observable<any> {
            return this.userService.deleteUser(id);
    }
}
