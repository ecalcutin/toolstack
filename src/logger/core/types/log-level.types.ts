export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export const LOG_LEVEL = {
  Error: 'error',
  Warn: 'warn',
  Info: 'info',
  Debug: 'debug',
} as const;
