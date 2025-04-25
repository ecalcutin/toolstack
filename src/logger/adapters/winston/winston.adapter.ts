import { inject, injectable, optional } from 'inversify';
import { LogFormatter, Logger, LogLevel, LogContext } from '../../core';
import {
  LOG_LEVEL_MAP,
  WinstonLogLevel,
  WinstonAdapterOptions,
} from './winston.types';
import {
  createLogger,
  transports,
  Logger as WinstonLoggerInstance,
} from 'winston';
import { SYMBOLS } from '../../di/symbols';
import { format } from 'winston';

/**
 * Winston implementation of the Logger interface
 */
@injectable()
export class WinstonAdapter implements Logger {
  private readonly logger: WinstonLoggerInstance;
  private readonly formatter: LogFormatter;

  constructor(
    @inject(SYMBOLS.Formatter) formatter: LogFormatter,
    @inject(SYMBOLS.LoggerOptions) @optional() options?: WinstonAdapterOptions,
  ) {
    this.formatter = formatter;
    const loggerOptions = options || {};

    this.logger = createLogger({
      level: this.mapLogLevel(
        loggerOptions.level
          ? this.mapCustomLevel(loggerOptions.level)
          : LogLevel.Info,
      ),
      format: this.createWinstonFormat(),
      handleExceptions: true,
      handleRejections: true,
      transports: [new transports.Console()],
    });
  }

  info(message: string, context?: LogContext): void {
    this.logger.info(message, { context });
  }

  warn(message: string, context?: LogContext): void {
    this.logger.warn(message, { context });
  }

  error(message: string, context?: LogContext): void {
    this.logger.error(message, { context });
  }

  private createWinstonFormat() {
    return format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.printf(info => {
        const { timestamp, level, message, context, stack, ...rest } = info;
        const combinedContext = {
          ...(context || {}),
          ...(Object.keys(rest).length > 0 ? rest : {}),
        };

        return this.formatter.format(
          this.mapWinstonLevel(level),
          message as string,
          {
            ...combinedContext,
            ...(stack ? { stack } : {}),
          },
        );
      }),
    );
  }

  private mapWinstonLevel(winstonLevel: string): LogLevel {
    const reverseMap: Record<string, LogLevel> = {
      [WinstonLogLevel.Error]: LogLevel.Error,
      [WinstonLogLevel.Warn]: LogLevel.Warn,
      [WinstonLogLevel.Info]: LogLevel.Info,
      [WinstonLogLevel.Debug]: LogLevel.Debug,
    };
    return reverseMap[winstonLevel.toLowerCase()] || LogLevel.Info;
  }

  private mapCustomLevel(level: WinstonLogLevel): LogLevel {
    const reverseMap: Record<WinstonLogLevel, LogLevel> = {
      [WinstonLogLevel.Error]: LogLevel.Error,
      [WinstonLogLevel.Warn]: LogLevel.Warn,
      [WinstonLogLevel.Info]: LogLevel.Info,
      [WinstonLogLevel.Debug]: LogLevel.Debug,
      // Map these extra Winston levels to our closest equivalents
      [WinstonLogLevel.Verbose]: LogLevel.Debug,
      [WinstonLogLevel.Silly]: LogLevel.Debug,
    };
    return reverseMap[level] || LogLevel.Info;
  }

  private mapLogLevel(level: LogLevel): string {
    return LOG_LEVEL_MAP[level] || WinstonLogLevel.Info;
  }
}
