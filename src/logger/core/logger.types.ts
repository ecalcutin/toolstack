export enum LogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

export type LogMeta = Record<string, unknown>;

export interface LoggerOptions {
  readonly level?: LogLevel;
}
