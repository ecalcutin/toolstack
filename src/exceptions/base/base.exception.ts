import type { BaseErrorOptions } from './base.interface.js';
import { DEFAULT_ERROR_CODE } from '../constants/error-codes.js';
import { DEFAULT_ERROR_MESSAGE } from '../constants/error-messages.js';

export class BaseError<ContextType = unknown> extends Error {
  public readonly code: string;
  public readonly context?: ContextType;

  constructor(
    message: string = DEFAULT_ERROR_MESSAGE,
    options: BaseErrorOptions<ContextType> = {
      code: DEFAULT_ERROR_CODE,
    },
  ) {
    super(message, { cause: options.cause });

    this.code = options.code;
    this.name = this.constructor.name;
    this.context = options.context;

    Object.setPrototypeOf(this, new.target.prototype);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
