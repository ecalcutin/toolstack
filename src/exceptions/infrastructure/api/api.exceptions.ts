import { BaseException, type BaseExceptionOptions } from '~/exceptions/core';

export class APIException extends BaseException {
  constructor(options?: BaseExceptionOptions) {
    super(options);
  }
}
