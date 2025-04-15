export interface BaseExceptionOptions<
  ContextType = unknown,
  CauseType = unknown,
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
