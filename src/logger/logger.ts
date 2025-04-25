import { BaseLogger } from './base-logger.abstract';

import { WinstonLogger } from './implementations';

export class Logger extends BaseLogger {
  private readonly instance: BaseLogger;

  constructor() {
    super();
    this.instance = new WinstonLogger();
  }

  error(message: string, meta?: object): void {
    this.instance.error(message, meta);
  }

  warn(message: string, meta?: object): void {
    this.instance.warn(message, meta);
  }

  info(message: string, meta?: object): void {
    this.instance.info(message, meta);
  }
}
