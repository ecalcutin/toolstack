import { BaseException, type BaseExceptionOptions } from '~/exceptions/core';

export class ValidationException extends BaseException {
  constructor(options?: BaseExceptionOptions) {
    super(options);
  }
}
