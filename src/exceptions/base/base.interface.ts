export interface BaseExceptionOptions<
  ContextType extends Record<string, unknown> = Record<string, unknown>,
  CauseType extends Error = Error,
> {
  /**
   * Unique error code for programmatic handling
   * (e.g., "AUTH_TIMEOUT", "VALIDATION_ERROR")
   */
  code?: string;

  /**
   * Custom error message
   * If not provided, a default message based on the error code will be used
   */
  message?: string;

  /**
   * Additional error context
   * (object, array, primitive, or another error)
   */
  context?: ContextType;

  /**
   * Original error/cause that triggered this error
   * (same as native Error's `cause` property)
   */
  cause?: CauseType;
}

export interface SerializedError {
  readonly name: string;
  readonly code: string;
  readonly message: string;
  readonly stack?: string;
  readonly cause?: Error;
  readonly context?: Record<string, unknown>;
}
