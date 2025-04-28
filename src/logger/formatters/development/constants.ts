import { ChalkStyler } from '~/logger/adapters';
import { LOG_LEVEL } from '~/logger/core';

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
    icon: LOG_ICONS.Default,
    colorize: ChalkStyler.magentaBright,
  },
};

export const LOG_PARTS = {
  LOG_START: ChalkStyler.gray(LOG_ICONS.Square),
  VERTICAL_LINE: ChalkStyler.gray('│'),
  CORNER_LINE: ChalkStyler.gray('└─'),
};
