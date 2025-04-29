import { BaseException } from '~/exceptions';
import { SerializedError } from '~/exceptions/core/base/base.interface';

import type { LogContext, Transport } from './interfaces';
import { type LogLevel, LOG_LEVEL_PRIORITY } from './types';

export class Logger {
  constructor(
    private readonly level: LogLevel,
    private readonly transports: Transport[],
  ) {}

  private log(level: LogLevel, message: string, context?: LogContext): void {
    if (LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.level]) {
      this.transports.forEach(transport => {
        transport.log(level, { message, context });
      });
    }
  }

  public error(error: unknown, context?: LogContext): void {
    const { message, ...serializedContext } = this.serializeError(
      error,
      context,
    );

    this.log('error', message, serializedContext);
  }

  public warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  public info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  public debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  public verbose(message: string, context?: LogContext): void {
    this.log('verbose', message, context);
  }

  private serializeError(
    error: unknown,
    context?: LogContext,
  ): SerializedError {
    if (error instanceof BaseException) {
      const { context: errorContext, ...rest } = error.toJSON();

      return {
        ...rest,
        ...errorContext,
        ...context,
      };
    }

    if (error instanceof Error) {
      return {
        name: error.name || 'Unknown error',
        message: error.message || 'Unknown error occurred',
        code: 'UNKNOWN_CODE',
        stack: error.stack,
        ...(error.cause ? { cause: error.cause as Error } : {}),
        ...context,
      };
    }

    return {
      name: 'Unknown error',
      message: 'Unknown error occurred',
      code: 'UNKNOWN_CODE',
      context: {
        ...context,
        errorType: typeof error,
        errorString: String(error),
      },
    };
  }
}
