import type {
  BaseExceptionOptions,
  ErrorContext,
  ErrorCause,
  SerializedError,
} from './base.interface';
import { DEFAULT_ERROR_CODE } from './constants/error-codes';
import { DEFAULT_ERROR_MESSAGE } from './constants/error-messages';

export class BaseException<
  ContextType extends ErrorContext = ErrorContext,
  CauseType extends ErrorCause = ErrorCause,
> extends Error {
  public readonly code: string;
  public readonly context?: ContextType;
  public readonly cause?: Error;

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

  public toJSON(): SerializedError {
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
