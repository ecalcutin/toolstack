import { Logger, LoggerOptions, LogLevel } from '../core';
import { DevelopmentFormatter } from '../formatters';
import { WinstonAdapter } from '../adapters';

/**
 * The LoggerFactory class serves as a factory for creating logger instances
 */
export class LoggerFactory {
  public static create(options: Partial<LoggerOptions>): Logger {
    const formatter = new DevelopmentFormatter(options);
    return new WinstonAdapter(formatter, {
      level: options.level || LogLevel.Info,
    });
  }
}
