import { HttpException, HttpStatus } from '@nestjs/common';

export class AppException extends HttpException {
  public errorCode;
  constructor(message: string, httpCode: HttpStatus, errorCode: string) {
    super(message, httpCode);
    this.errorCode = errorCode;
  }
}
