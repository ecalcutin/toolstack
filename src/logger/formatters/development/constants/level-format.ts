import chalk from 'chalk';
import { LogLevel } from '../../../core';
import { LogIcon } from './log-icon';

export const LEVEL_FORMATTING: Record<
  LogLevel,
  {
    color: (text: string) => string;
    icon: (typeof LogIcon)[keyof typeof LogIcon];
  }
> = {
  [LogLevel.Error]: {
    icon: LogIcon.Error,
    color: chalk.redBright,
  },
  [LogLevel.Warn]: {
    icon: LogIcon.Warn,
    color: chalk.yellowBright,
  },
  [LogLevel.Info]: {
    icon: LogIcon.Info,
    color: chalk.greenBright,
  },
  [LogLevel.Debug]: {
    icon: LogIcon.Default,
    color: chalk.magentaBright,
  },
};
