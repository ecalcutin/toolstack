import { LOG_LEVEL, LogContext, Transport } from '~/logger/core';
import { developmentFormatter } from '~/logger/formatters/development';

export class ConsoleTransport implements Transport {
  constructor(private readonly formatter: typeof developmentFormatter) {}

  public log(
    level: (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL],
    message: string,
    context: LogContext,
  ): void {
    const method = this.getConsoleMethod(level);
    method(this.formatter({ level, message, context }));
  }

  // eslint-disable-next-line
  private getConsoleMethod(level: string): (...args: any[]) => void {
    switch (level) {
      case 'error':
        // eslint-disable-next-line
        return console.error;
      case 'warn':
        // eslint-disable-next-line
        return console.warn;
      case 'info':
        // eslint-disable-next-line
        return console.info;
      case 'debug':
        // eslint-disable-next-line
        return console.debug;
      default:
        // eslint-disable-next-line
        return console.log;
    }
  }
}
