import { Controller, Get, Put, Param, Body, Post, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { Observable } from 'rxjs';
import { UserDto } from './user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @UseGuards(AuthGuard())
    @Get('all')
    getAllUsers(): Observable<UserDto[]> {
        return this.userService.getAllUsers();
    }

    // @UseGuards(AuthGuard())
    @Get(':id')
    getById(@Param() params): Observable<UserDto> {
        return this.userService.getUserById(params.id);
    }

    // @UseGuards(AuthGuard())
    @Put('update/:id')
    updateUser(@Body() updatedUser: User, @Param() params): string {
        return this.userService.updateUser(updatedUser, params.id);
    }

    @Post('create')
    createUser(@Body() newUser: User): string {
        return this.userService.createUser(newUser);
    }

    // @UseGuards(AuthGuard())
    @Delete(':id')
    deleteUser(@Param() params): string {
            return this.userService.deleteUser(params.id);
    }
}
