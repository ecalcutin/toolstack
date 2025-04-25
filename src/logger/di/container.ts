import { Container } from 'inversify';
import { SYMBOLS } from './symbols';
import { FormatterOptions, LoggerOptions, Logger, LogFormatter } from '../core';
import { LoggerFacade } from '../facade';
import { DevelopmentFormatter } from '../formatters';

export function createContainer(options: LoggerOptions = {}): Container {
  const { level, formatterOptions = {} } = options;

  const container = new Container();

  container
    .bind<LoggerOptions>(SYMBOLS.LoggerOptions)
    .toConstantValue({ level, formatterOptions });

  container.bind<FormatterOptions>(SYMBOLS.FormatterOptions).toConstantValue({
    timestamp: true,
    ...formatterOptions,
  });

  container
    .bind<LogFormatter>(SYMBOLS.Formatter)
    .to(DevelopmentFormatter)
    .inSingletonScope();

  container.bind<Logger>(SYMBOLS.Logger).to(LoggerFacade).inSingletonScope();

  return container;
}
