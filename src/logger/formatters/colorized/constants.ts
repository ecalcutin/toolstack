import { ChalkStyler } from '~/logger/adapters';
import { LOG_LEVEL, type LogLevel } from '~/logger/core';

export enum LOG_ICONS {
  Error = '⚡',
  Warn = '⚠️',
  Fatal = '✖',
  Info = 'ℹ️',
  Square = '◼',
  Refresh = '🔄',
  File = '📄',
  Package = '📦',
  ArrowRight = '→',
  ArrowSub = '⇢',
  InternalPackage = '⚙️',
}

export const LEVEL_FORMATTING: Record<
  LogLevel,
  {
    colorize: (text: string) => string;
    icon: LOG_ICONS;
  }
> = {
  [LOG_LEVEL.Error]: {
    icon: LOG_ICONS.Error,
    colorize: ChalkStyler.redBright,
  },
  [LOG_LEVEL.Warn]: {
    icon: LOG_ICONS.Warn,
    colorize: ChalkStyler.yellowBright,
  },
  [LOG_LEVEL.Info]: {
    icon: LOG_ICONS.Info,
    colorize: ChalkStyler.greenBright,
  },
  [LOG_LEVEL.Debug]: {
    icon: LOG_ICONS.Info,
    colorize: ChalkStyler.magentaBright,
  },
  [LOG_LEVEL.Verbose]: {
    icon: LOG_ICONS.Info,
    colorize: ChalkStyler.cyanBright,
  },
};

export const LOG_PARTS = {
  LOG_START: ChalkStyler.gray(LOG_ICONS.Square),
  VERTICAL_LINE: ChalkStyler.gray('│'),
  CORNER_LINE: ChalkStyler.gray('└─'),
};
