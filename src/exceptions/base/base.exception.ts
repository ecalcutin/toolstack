import type { BaseExceptionOptions } from './base.interface.js';
import { DEFAULT_ERROR_CODE } from '../constants/error-codes.js';
import { DEFAULT_ERROR_MESSAGE } from '../constants/error-messages.js';

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
      ...(this.cause ? { cause: this.formatCause() } : {}),
    };
  }

  private formatCause(): unknown {
    if (this.cause instanceof Error) {
      return {
        name: this.cause.name,
        message: this.cause.message,
      };
    }
    return this.cause;
  }
}
