import { LogLevel } from '../types';

import { LogContext } from './log-context.interface';

export interface Formatter {
  format: (level: LogLevel, message: string, context?: LogContext) => string;
}
