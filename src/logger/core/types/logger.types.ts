export interface CommonLogFields {
  readonly timestamp?: Date | string;
}

/**
 * Type for metadata that can be included with log messages
 */
export type LogContext = Record<string, unknown> & Partial<CommonLogFields>;
