import { LogLevel } from './log-level.enum';

type CommonLogFields = {
  readonly timestamp?: Date | string;
};

/**
 * Type for metadata that can be included with log messages
 */
export type LogContext = Record<string, unknown> & Partial<CommonLogFields>;

/**
 * Configuration options for the logger system
 */
export type LoggerOptions = {
  readonly level?: LogLevel;
};
