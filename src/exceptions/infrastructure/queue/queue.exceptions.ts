import { BaseException, type BaseExceptionOptions } from '~/exceptions/core';

export class QueueException extends BaseException {
  constructor(options?: BaseExceptionOptions) {
    super(options);
  }
}
