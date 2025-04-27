import {
  createLogger,
  transports,
  Logger as WinstonLoggerInstance,
  format,
} from 'winston';

import {
  LogFormatter,
  Logger,
  LogLevel,
  LogContext,
  LoggerOptions,
} from '~/logger/core';

/**
 * Winston implementation of the Logger interface
 */
export class WinstonAdapter implements Logger {
  private readonly logger: WinstonLoggerInstance;

  constructor(
    private readonly formatter: LogFormatter,
    private readonly options: LoggerOptions,
  ) {
    this.logger = createLogger({
      level: this.options.level,
      format: this.createWinstonFormat(),
      handleExceptions: true,
      handleRejections: true,
      transports: [new transports.Console()],
    });
  }

  info(message: string, context?: LogContext): void {
    this.logger.info(message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.logger.warn(message, context);
  }

  error(message: string, context?: LogContext): void {
    this.logger.error(message, context);
  }

  debug(message: string, context?: LogContext): void {
    this.logger.debug(message, context);
  }

  verbose(message: string, context?: LogContext): void {
    this.logger.verbose(message, context);
  }

  private createWinstonFormat() {
    return format.combine(
      format.errors({ stack: true }),
      format.printf(info => {
        const { level, message, ...context } = info;

        return this.formatter.format(
          level as LogLevel,
          message as string,
          context,
        );
      }),
    );
  }
}
