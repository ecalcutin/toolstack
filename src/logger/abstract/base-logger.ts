export abstract class BaseLogger {
  abstract error(message: string, meta?: object): void;
  abstract warn(message: string, meta?: object): void;
  abstract info(message: string, meta?: object): void;
}
