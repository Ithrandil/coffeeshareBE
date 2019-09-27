import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiOkResponse, ApiUnauthorizedResponse, ApiUseTags } from '@nestjs/swagger';
import { LoginIdentifiersDto } from './models/login-identifiers.dto';
import { Observable } from 'rxjs';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiOperation({ title: 'Create JWT for login' })
  @ApiOkResponse({ description: 'Successful operation, encrypted user on a JWT sent', type: 'JWT' })
  @ApiUnauthorizedResponse({
    description: 'Wrong identifiers',
  })
  loginUser(@Body() identifiers: LoginIdentifiersDto): Observable<any> {
    return this.authService.signIn(identifiers);
  }
}
