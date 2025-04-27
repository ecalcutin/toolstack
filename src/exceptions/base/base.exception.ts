import { DEFAULT_ERROR_CODE } from '../constants/error-codes';
import { DEFAULT_ERROR_MESSAGE } from '../constants/error-messages';

import type { BaseExceptionOptions } from './base.interface';

export class BaseException<
  ContextType = unknown,
  CauseType = unknown,
> extends Error {
  public readonly code: string;
  public readonly context?: ContextType;
  public readonly cause?: CauseType;

  constructor(
    options: BaseExceptionOptions<ContextType, CauseType> = {
      message: DEFAULT_ERROR_MESSAGE,
      code: DEFAULT_ERROR_CODE,
    },
  ) {
    super(options.message ?? DEFAULT_ERROR_MESSAGE, { cause: options.cause });
    this.code = options.code ?? DEFAULT_ERROR_CODE;
    this.name = this.constructor.name;
    this.context = options.context;
    this.cause = options.cause;

    Object.setPrototypeOf(this, new.target.prototype);

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      code: this.code,
      message: this.message,
      ...(this.context ? { context: this.context } : {}),
      ...(this.cause ? { cause: this.cause } : {}),
      ...(this.stack ? { stack: this.stack } : {}),
    };
  }
}
