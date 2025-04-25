import { LogLevel } from '../../core/types/log-level.enum';
export enum WinstonLogLevel {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Verbose = 'verbose',
  Silly = 'silly',
}

export interface WinstonAdapterOptions {
  readonly level?: WinstonLogLevel;
}

export const LOG_LEVEL_MAP: Record<LogLevel, WinstonLogLevel> = {
  [LogLevel.Error]: WinstonLogLevel.Error,
  [LogLevel.Warn]: WinstonLogLevel.Warn,
  [LogLevel.Info]: WinstonLogLevel.Info,
  [LogLevel.Debug]: WinstonLogLevel.Debug,
};
