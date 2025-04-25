import { LogLevel, LoggerOptions } from '../core';

export const defaultLoggerConfig: LoggerOptions = {
  level: LogLevel.Info,
};

export const developmentConfig: LoggerOptions = {
  ...defaultLoggerConfig,
  level: LogLevel.Debug,
};

export const productionConfig: LoggerOptions = {
  ...defaultLoggerConfig,
};

export const testConfig: LoggerOptions = {
  ...defaultLoggerConfig,
  level: LogLevel.Error,
};
