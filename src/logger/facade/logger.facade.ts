import { inject, injectable } from 'inversify';
import { LogFormatter, Logger } from '../core';
import { SYMBOLS, container } from '../di';
import { WinstonAdapter } from '../adapters';
import { ColoredFormatter } from '../formatters';

@injectable()
export class LoggerFacade extends Logger {
  private readonly instance: Logger;
  private readonly formatter: LogFormatter;

  constructor(
    @inject(SYMBOLS.Formatter) formatter: LogFormatter,
    @inject(SYMBOLS.LoggerImplementation) implementation?: Logger,
  ) {
    super();
    this.formatter = formatter;
    this.instance = implementation || new WinstonAdapter(formatter);
  }

  info(message: string, context?: any): void {
    this.instance.info(message, context);
  }

  warn(message: string, context?: any): void {
    this.instance.warn(message, context);
  }

  error(message: string, context?: any): void {
    this.instance.error(message, context);
  }

  public static create(): Logger {
    try {
      return container.get<Logger>(SYMBOLS.Logger);
    } catch (error) {
      const formatter = new ColoredFormatter();
      return new LoggerFacade(formatter, new WinstonAdapter(formatter));
    }
  }
}
