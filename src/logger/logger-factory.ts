import { Logger, LoggerOptions } from './core';
import { colorizedFormatter } from './formatters';
import { ConsoleTransport } from './transports';

export { type LoggerOptions };

export function createLogger(options: LoggerOptions = {}): Logger {
  const {
    transports = [new ConsoleTransport(options.format || colorizedFormatter)],
  } = options;

  return new Logger(transports);
}
