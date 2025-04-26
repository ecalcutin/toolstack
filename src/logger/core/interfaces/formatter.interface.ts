import { LogLevel } from '../types/log-level.enum';

/**
 * Interface for log formatters that transform log entries into formatted strings
 */
export interface LogFormatter {
  /**
   * Formats a log message with level and context
   * @param level The log level
   * @param message The message to format
   * @param context Optional context data to include
   * @returns Formatted log string
   */
  format(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): string;
}
