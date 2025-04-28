export type LogLevel = 'error' | 'warn' | 'info' | 'debug' | 'verbose';

export const LOG_LEVEL = {
  Error: 'error',
  Warn: 'warn',
  Info: 'info',
  Debug: 'debug',
  Verbose: 'verbose',
} as const;
