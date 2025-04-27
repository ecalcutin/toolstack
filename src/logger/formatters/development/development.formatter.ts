import chalk from 'chalk';

import {
  LogContext,
  LogFormatter,
  LoggerOptions,
  LogLevel,
} from '~/logger/core';

import { LEVEL_FORMATTING, LogIcon } from './constants';
import { formatContext } from './context.formatter';
import { formatStack } from './stack.formatter';

export class DevelopmentFormatter implements LogFormatter {
  constructor(private readonly options?: Partial<LoggerOptions>) {}

  format(level: LogLevel, message: string, context?: LogContext): string {
    const formatting = LEVEL_FORMATTING[level];
    const timestamp = new Date().toISOString();

    let output = [
      `${chalk.gray(LogIcon.LogStart)} ${chalk.gray(timestamp)}`,
      `${formatting.color(formatting.icon)} ${level.toUpperCase().padEnd(5)} ${message}`,
    ].join(' ');

    // Check for stack trace in context
    let stack: unknown;

    if (context) {
      if ('stack' in context) {
        stack = context.stack;
        // Create a new context without the stack to avoid duplicating it
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { stack: _, ...restContext } = context;
        context = Object.keys(restContext).length > 0 ? restContext : undefined;
      }
    }

    if (context) {
      output += formatContext(context);
    }

    if (stack) {
      output += formatStack(stack);
    }

    return output;
  }
}
