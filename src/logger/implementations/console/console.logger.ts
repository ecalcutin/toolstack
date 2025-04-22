import { BaseLogger } from '../../abstract/base-logger';

export class ConsoleLogger extends BaseLogger {
  error(message: string, meta?: object): void {
    console.error(message, meta);
  }
  info(message: string, meta?: object): void {
    console.log(message, meta);
  }
  warn(message: string, meta?: object): void {
    console.log(message, meta);
  }
}
