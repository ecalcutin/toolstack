export function formatError(error: unknown): Record<string, unknown> {
  if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause ? formatError(error.cause) : undefined,
    };
  }

  if (typeof error === 'string') {
    return {
      message: error,
    };
  }

  if (typeof error === 'object' && error !== null) {
    return {
      ...error,
    };
  }

  return {
    rawError: error,
    type: typeof error,
  };
}

export function extractErrorContext(error: Error): Record<string, unknown> {
  const context: Record<string, unknown> = {
    name: error.name,
    message: error.message,
  };

  if (error.stack) {
    context.stack = error.stack;
  }

  if (error.cause) {
    context.cause = formatError(error.cause);
  }

  // Extract custom properties
  Object.getOwnPropertyNames(error).forEach(key => {
    if (!['name', 'message', 'stack', 'cause'].includes(key)) {
      context[key] = (error as unknown as Record<string, unknown>)[key];
    }
  });

  return context;
}
