import { InternalServerErrorException } from '@nestjs/common';

export class DatabaseException extends InternalServerErrorException {
  public constructor(message?: string) {
    super(message);
  }
}
