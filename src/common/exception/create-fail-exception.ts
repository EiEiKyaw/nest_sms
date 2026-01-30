import { HttpException, HttpStatus } from '@nestjs/common';

export class CreateFailException extends HttpException {
  constructor(errorMessage?: string) {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: errorMessage,
        error: 'Creation Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
