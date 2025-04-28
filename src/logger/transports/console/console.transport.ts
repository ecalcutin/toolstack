import { Formatter, LogContext, LogLevel, Transport } from '~/logger/core';

export class ConsoleTransport implements Transport {
  constructor(private readonly formatter: Formatter) {}

  public log(
    level: LogLevel,
    raw: {
      message: string;
      context?: LogContext;
    },
  ): void {
    const method = this.getLogMethod(level);
    const message = this.formatter.format(level, raw.message, raw.context);
    method(message);
  }

  /* eslint-disable no-console  */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any  */
  private getLogMethod(level: string): (...args: any[]) => void {
    switch (level) {
      case 'error':
        return console.error;
      case 'warn':
        return console.warn;
      case 'info':
        return console.info;
      case 'debug':
        return console.debug;
      default:
        return console.log;
    }
    /* eslint-enable */
  }
}
