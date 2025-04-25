import { Container } from 'inversify';
import { SYMBOLS } from './symbols';
import { FormatterOptions, LogFormatter, Logger, LoggerOptions } from '../core';
import { WinstonAdapter } from '../adapters';
import { LoggerFacade } from '../facade';
import { getConfig } from '../config';
import { ColoredFormatter } from '../formatters';

export interface ContainerOptions {
  readonly environment?: 'development' | 'production' | 'test' | 'custom';
  readonly loggerConfig?: Partial<LoggerOptions>;
  readonly formatterOptions?: Partial<FormatterOptions>;
}
export function createContainer(options: ContainerOptions = {}): Container {
  const {
    environment = (process.env.NODE_ENV as
      | 'development'
      | 'production'
      | 'test'
      | 'custom') || 'development',
    loggerConfig,
    formatterOptions = {},
  } = options;

  const container = new Container();

  const config = getConfig(environment, loggerConfig);

  container.bind<LoggerOptions>(SYMBOLS.LoggerOptions).toConstantValue(config);

  container.bind<FormatterOptions>(SYMBOLS.FormatterOptions).toConstantValue({
    colorize: true,
    timestamp: true,
    includeContext: true,
    ...formatterOptions,
  });

  container
    .bind<LogFormatter>(SYMBOLS.Formatter)
    .to(ColoredFormatter)
    .inSingletonScope();

  container.bind<Logger>(SYMBOLS.LoggerImplementation).to(WinstonAdapter);

  container.bind<Logger>(SYMBOLS.Logger).to(LoggerFacade);

  return container;
}

export const container = createContainer();
