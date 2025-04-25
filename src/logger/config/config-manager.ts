import { LoggerOptions } from '../core';
import {
  defaultLoggerConfig,
  developmentConfig,
  productionConfig,
  testConfig,
} from './default.config';

export type Environment = 'development' | 'production' | 'test' | 'custom';

export function getConfig(
  env: Environment = (process.env.NODE_ENV as Environment) || 'development',
  customConfig?: Partial<LoggerOptions>,
) {
  let config: LoggerOptions;

  switch (env) {
    case 'development':
      config = developmentConfig;
      break;
    case 'production':
      config = productionConfig;
      break;
    case 'test':
      config = testConfig;
      break;
    case 'custom':
      config = { ...defaultLoggerConfig, ...customConfig };
      break;
    default:
      config = defaultLoggerConfig;
  }

  return config;
}
