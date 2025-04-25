import { LogContext } from './types';

/**
 * Abstract logger interface that defines the core logging methods
 */
export interface Logger {
  info(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  error(message: string, context?: LogContext): void;
}
