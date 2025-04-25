import { LogLevel } from './logger.types';

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

export interface FormatterOptions {
  /**
   * Whether to colorize log output
   */
  colorize?: boolean;

  /**
   * Whether to include timestamp in log output
   */
  timestamp?: boolean;

  /**
   * Format string for timestamps
   */
  timestampFormat?: string;

  /**
   * Maximum number of stack frames to display
   */
  maxStackFrames?: number;

  /**
   * Whether to include context in log output
   */
  includeContext?: boolean;
}

/**
 * Mapping of log levels to colors and icons
 */
export interface LevelFormatting {
  icon: string;
  color: string;
}
