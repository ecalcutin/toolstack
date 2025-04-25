import { LogLevel as CoreLogLevel } from '../../core';

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

export const LOG_LEVEL_MAP: Record<CoreLogLevel, WinstonLogLevel> = {
  [CoreLogLevel.Error]: WinstonLogLevel.Error,
  [CoreLogLevel.Warn]: WinstonLogLevel.Warn,
  [CoreLogLevel.Info]: WinstonLogLevel.Info,
  [CoreLogLevel.Debug]: WinstonLogLevel.Debug,
};
