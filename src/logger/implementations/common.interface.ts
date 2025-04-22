import { type ChalkInstance } from 'chalk';

export enum LogIcon {
  Error = '⚡',
  Warn = '⚠️',
  Fatal = '✖',
  Info = 'ℹ️',
  Default = Info,
  LogStart = '◼',
  Refresh = '🔄',
  File = '📄',
  Package = '📦',
  ArrowRight = '→',
  ArrowSub = '⇢',
}
export type LogIcons = `${LogIcon}`;

export enum Level {
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Verbose = 'verbose',
  Debug = 'debug',
}

export type Levels = `${Level}`;

export type LevelIcons = {
  [K in Level]: LogIcons;
};

export type LevelColors = {
  [K in Level]: ChalkInstance;
};

export interface FormatOptions {
  levelIcons: LevelIcons;
  levelColors: LevelColors;
}
