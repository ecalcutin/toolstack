import { BaseException, BaseExceptionOptions } from './base';

export class APIException extends BaseException {
  constructor(options: BaseExceptionOptions) {
    super(options);
  }
}
