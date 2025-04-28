import { BaseException, type BaseExceptionOptions } from '~/exceptions/core';

export class DatabaseException extends BaseException {
  constructor(options?: BaseExceptionOptions) {
    super(options);
  }
}
