/**
 * Configuration options for formatters
 */
export interface FormatterOptions {
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
}
