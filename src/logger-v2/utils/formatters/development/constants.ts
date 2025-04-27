import chalk from 'chalk';

import { LOG_LEVEL } from '~/logger-v2/core';

export const LOG_ICONS = {
  Error: '⚡',
  Warn: '⚠️',
  Fatal: '✖',
  Info: 'ℹ️',
  Default: 'ℹ️',
  Square: '◼',
  Refresh: '🔄',
  File: '📄',
  Package: '📦',
  ArrowRight: '→',
  ArrowSub: '⇢',
  InternalPackage: '⚙️',
} as const;

export const LEVEL_FORMATTING: Record<
  (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL],
  {
    colorize: (text: string) => string;
    icon: (typeof LOG_ICONS)[keyof typeof LOG_ICONS];
  }
> = {
  [LOG_LEVEL.Error]: {
    icon: LOG_ICONS.Error,
    colorize: chalk.redBright,
  },
  [LOG_LEVEL.Warn]: {
    icon: LOG_ICONS.Warn,
    colorize: chalk.yellowBright,
  },
  [LOG_LEVEL.Info]: {
    icon: LOG_ICONS.Info,
    colorize: chalk.greenBright,
  },
  [LOG_LEVEL.Debug]: {
    icon: LOG_ICONS.Default,
    colorize: chalk.magentaBright,
  },
};

export const LOG_PARTS = {
  LOG_START: chalk.gray(LOG_ICONS.Square),
  VERTICAL_LINE: chalk.gray('│'),
  CORNER_LINE: chalk.gray('└─'),
};
