import { Controller, Get, Put, Param, Body, Post, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Observable } from 'rxjs';
import { UserDto } from './user.dto';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @UseGuards(AuthGuard())
    @ApiOperation({title: 'Get all users'})
    @Get()
    getAllUsers(): Observable<UserDto[]> {
        return this.userService.getAllUsers();
    }

    // @UseGuards(AuthGuard())
    @ApiOperation({title: 'Get of a specific user with his UUID'})
    @Get(':id')
    getById(@Param() id): Observable<UserDto> {
        return this.userService.getUserById(id);
    }

    // @UseGuards(AuthGuard())
    @ApiOperation({title: 'User update'})
    @Put(':id')
    updateUser(@Body() updatedUser: User, @Param() id): string {
        return this.userService.updateUser(updatedUser, id);
    }

    @ApiOperation({title: 'User creation'})
    @Post()
    createUser(@Body() newUser: User): Observable<string | User> {
        return this.userService.createUser(newUser);
    }

    // @UseGuards(AuthGuard())
    @ApiOperation({title: 'User deletion'})
    @Delete(':id')
    deleteUser(@Param() id): string {
            return this.userService.deleteUser(id);
    }
}
