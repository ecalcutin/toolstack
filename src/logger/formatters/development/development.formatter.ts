import { LOG_LEVEL, LogContext } from '~/logger/core';

import { LEVEL_FORMATTING, LOG_PARTS } from './constants';
import { formatContext } from './context.formatter';
import { formatStack } from './stack.formatter';

type LogLevel = (typeof LOG_LEVEL)[keyof typeof LOG_LEVEL];

type FormatterArgs = {
  level: LogLevel;
  message: string;
  context?: LogContext & { stack?: string };
};

export const developmentFormatter = (args: FormatterArgs): string => {
  const { level, message, context } = args;

  const { icon, colorize } = LEVEL_FORMATTING[level];
  const output: Array<string> = [];

  output.push(
    [
      LOG_PARTS.LOG_START,
      icon,
      level.toUpperCase().padEnd(5),
      colorize(message),
    ].join(' '),
  );

  if (context) {
    if (level !== 'error') {
      output.push([formatContext(context)].join(''));
    } else {
      const { stack, ...rest } = context;
      output.push([formatContext(rest), formatStack(stack)].join(''));
    }
  }

  return output.join('');
};
