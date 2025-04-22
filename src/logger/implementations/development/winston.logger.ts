import { createLogger, transports, type Logger } from 'winston';

import { BaseLogger } from '../../abstract/base-logger';
import { Level } from '../common.interface';

import { format } from './formatter';

type LogContext = Record<string, unknown>;

export class WinstonLogger extends BaseLogger {
  private readonly logger: Logger;

  constructor() {
    super();

    this.logger = createLogger({
      level: Level.Debug,
      format: format(),
      handleExceptions: true,
      handleRejections: true,
      transports: [new transports.Console()],
    });
  }

  info(message: string, meta?: object): void {
    this.logger.info(message, meta);
  }

  public warn(message: string, context?: LogContext): void {
    this.logger.warn(message, context);
  }

  error(error: unknown, context?: LogContext): void {
    if (error instanceof Error) {
      this.logger.error(error.message || 'Unknown error', {
        stack: error.stack,
        name: error.name,
        ...context,
      });
      return;
    }

    if (
      typeof error === 'string' ||
      typeof error === 'number' ||
      typeof error === 'boolean'
    ) {
      this.logger.error(error.toString(), context);
      return;
    }

    this.logger.error('UNKNOWN_ERROR', {
      error,
      errorType: typeof error,
      errorString: String(error),
      ...context,
    });
  }
}
