import { LogContext } from '../types/logger.types';

/**
 * Core logger interface that defines logging methods
 */
export interface Logger {
  /**
   * Logs an informational message
   * @param message The message to log
   * @param context Optional metadata to include with the log
   */
  info(message: string, context?: LogContext): void;

  /**
   * Logs a warning message
   * @param message The message to log
   * @param context Optional metadata to include with the log
   */
  warn(message: string, context?: LogContext): void;

  /**
   * Logs an error message
   * @param message The message to log
   * @param context Optional metadata to include with the log
   */
  error(message: unknown, context?: LogContext): void;

  /**
   * Logs an debug message
   * @param message The message to log
   * @param context Optional metadata to include with the log
   */
  debug(message: string, context?: LogContext): void;

  /**
   * Logs an verbose message
   * @param message The message to log
   * @param context Optional metadata to include with the log
   */
  verbose(message: string, context?: LogContext): void;
}
