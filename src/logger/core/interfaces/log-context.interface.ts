import { LogLevel } from '../types';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LogContext extends Record<string, unknown> {}

export interface Transport {
  log(level: LogLevel, message: string, context?: LogContext): void;
}
