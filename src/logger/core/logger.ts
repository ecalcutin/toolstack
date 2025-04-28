import type { LogContext, Transport } from './interfaces';
import { LogLevel } from './types';

export class Logger {
  constructor(private readonly transports: Transport[]) {}

  private log(level: LogLevel, message: string, context?: LogContext): void {
    this.transports.forEach(transport => {
      transport.log(level, { message, context });
    });
  }

  public error(message: string, context?: LogContext): void {
    this.log('error', message, context);
  }

  public warn(message: string, context?: LogContext): void {
    this.log('warn', message, context);
  }

  public info(message: string, context?: LogContext): void {
    this.log('info', message, context);
  }

  public debug(message: string, context?: LogContext): void {
    this.log('debug', message, context);
  }

  public verbose(message: string, context?: LogContext): void {
    this.log('verbose', message, context);
  }
}
