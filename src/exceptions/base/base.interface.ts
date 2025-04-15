export interface BaseErrorOptions<ContextType = unknown> {
  /**
   * Unique error code for programmatic handling
   * (e.g., "AUTH_TIMEOUT", "VALIDATION_ERROR")
   */
  code: string;

  /**
   * Additional error context
   * (object, array, primitive, or another error)
   */
  context?: ContextType;

  /**
   * Original error/cause that triggered this error
   * (same as native Error's `cause` property)
   */
  cause?: unknown;
}
