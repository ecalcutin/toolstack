import { LoggerFactory } from './factory';
import { Logger } from './core/interfaces/logger.interface';
import { LogLevel, FormatterOptions, LoggerOptions } from './core/types';

export { LogLevel };
export type { Logger };

export type { FormatterOptions };
export type { LoggerOptions };

export { LoggerFactory };

export function createLogger(options?: Partial<LoggerOptions>): Logger {
  return LoggerFactory.create(options);
}
