import { Logger, LoggerOptions } from '../core';
import { SYMBOLS } from '../di/symbols';
import { createContainer } from '../di/container';

/**
 * The LoggerFactory class serves as a factory for creating logger instances
 */
export class LoggerFactory {
  public static create(options?: Partial<LoggerOptions>): Logger {
    const container = createContainer(options);
    return container.get<Logger>(SYMBOLS.Logger);
  }
}
