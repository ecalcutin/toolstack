import type { LogContext, Transport } from '~/logger/core';

import { DevelopmentFormatter } from '../formatters/development';
import { ConsoleTransport } from '../transports';

import { LogLevel } from './types';

export class Logger {
  private transports: Transport[] = [];
  constructor() {
    this.transports.push(new ConsoleTransport(new DevelopmentFormatter()));
  }

  private log(level: LogLevel, message: string, context?: LogContext): void {
    this.transports.forEach(transport => {
      transport.log(level, { message, context });
    });
  }

  public info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  public error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }
}
