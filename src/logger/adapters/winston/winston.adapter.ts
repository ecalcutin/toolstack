import { inject, injectable, optional } from 'inversify';
import {
  LogFormatter,
  Logger,
  LogLevel,
  Logger as WinstonLoggerInstance,
} from '../../core';
import { LOG_LEVEL_MAP, WinstonLogLevel } from './winston.types';
import { createLogger, transports } from 'winston';
import { SYMBOLS } from '../../di/symbols';
import { format } from 'winston';

@injectable()
export class WinstonAdapter extends Logger {
  private readonly logger: WinstonLoggerInstance;
  private readonly formatter: LogFormatter;

  constructor(
    @inject(SYMBOLS.Formatter) formatter: LogFormatter,
    @inject(SYMBOLS.LoggerOptions) @optional() options?: any,
  ) {
    super();

    this.formatter = formatter;

    this.logger = createLogger({
      level: this.mapLogLevel(options.level || LogLevel.Info),
      format: this.createWinstonFormat(),
      handleExceptions: true,
      handleRejections: true,
      transports: [new transports.Console()],
    });
  }

  info(message: string, context?: any): void {
    this.logger.info(message, context);
  }

  warn(message: string, context?: any): void {
    this.logger.warn(message, context);
  }

  error(message: string, context?: any): void {
    this.logger.error(message, context);
  }

  private createWinstonFormat() {
    return format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.printf(info => {
        const { timestamp, level, message, context, stack, ...rest } = info;
        const combinedContext = {
          ...(context || {}),
          ...(Object.keys(rest).length > 0 ? rest : 0),
        };

        return this.formatter.format(
          this.mapWinstonLevel(level),
          message as string,
          {
            ...combinedContext,
            ...(stack ? { stack } : []),
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

  private mapLogLevel(level: LogLevel): string {
    return LOG_LEVEL_MAP[level] || WinstonLogLevel.Info;
  }
}
