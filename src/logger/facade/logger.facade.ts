import 'reflect-metadata';
import { inject, injectable } from 'inversify';

import { SYMBOLS } from '../di/symbols';
import { WinstonAdapter } from '../adapters';
import { LogFormatter, Logger, LogContext } from '../core';

@injectable()
export class LoggerFacade implements Logger {
  private readonly implementation: Logger;

  constructor(@inject(SYMBOLS.Formatter) formatter: LogFormatter) {
    this.implementation = new WinstonAdapter(formatter);
  }

  info(message: string, context?: LogContext): void {
    this.implementation.info(message, context);
  }

  warn(message: string, context?: LogContext): void {
    this.implementation.warn(message, context);
  }

  error(message: string, context?: LogContext): void {
    this.implementation.error(message, context);
  }
}
