import { LogLevel } from '../types';

import { LogContext } from './log-context.interface';

export interface Transport {
  log(
    level: LogLevel,
    raw: {
      message: string;
      context?: LogContext;
    },
  ): void;
}
