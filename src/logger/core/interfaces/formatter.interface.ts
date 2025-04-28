import { LogLevel } from '../types';

import { LogContext } from './log-context.interface';

export type Format = (
  level: LogLevel,
  message: string,
  context?: LogContext,
) => string;
