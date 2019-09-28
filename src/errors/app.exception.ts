import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from './error-code.model';

export class AppException extends HttpException {
  public errorCode;
  constructor(message: string, httpCode: HttpStatus, errorCode: ErrorCode) {
    super(message, httpCode);
    this.errorCode = errorCode;
  }
}
