import { LogLevel } from './logger.types';

export interface LogFormatter {
  format(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): string;

  formatError(
    error: unknown,
    context?: Record<string, unknown>,
  ): Record<string, unknown>;
}
