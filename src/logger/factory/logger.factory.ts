import { Logger, LoggerOptions } from '../core';
import { SYMBOLS } from '../di/symbols';
import { createContainer } from '../di/container';

export class LoggerFactory {
  public static create(options?: Partial<LoggerOptions>): Logger {
    const container = createContainer(options);
    return container.get<Logger>(SYMBOLS.Logger);
  }
}
