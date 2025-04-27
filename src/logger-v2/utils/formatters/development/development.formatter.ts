import { LogContext } from '~/logger-v2/core';

export const developmentFormatter = (
  level: string,
  message: string,
  context?: LogContext,
): string => {
  return `${level} ${message} ${JSON.stringify(context)}`;
};
