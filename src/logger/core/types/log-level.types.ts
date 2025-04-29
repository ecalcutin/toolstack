export enum LOG_LEVEL {
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
  Verbose = 'verbose',
}
export type LogLevel = `${LOG_LEVEL}`;
export const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  [LOG_LEVEL.Error]: 4,
  [LOG_LEVEL.Warn]: 3,
  [LOG_LEVEL.Info]: 2,
  [LOG_LEVEL.Debug]: 1,
  [LOG_LEVEL.Verbose]: 0,
};
