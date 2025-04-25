import { FormatterOptions } from './formatter.types';
import { LogLevel } from './log-level.enum';

/**
 * Configuration options for the logger system
 */
export interface LoggerOptions {
  /**
   * Core logger behavior configuration
   */
  readonly level?: LogLevel;

  /**
   * Formatter-specific configuration options
   */
  readonly formatterOptions?: Partial<FormatterOptions>;
}
