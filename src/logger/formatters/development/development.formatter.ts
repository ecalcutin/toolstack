import chalk from 'chalk';

import { injectable, inject, optional } from 'inversify';

import { formatContext } from './context.formatter';
import { formatStack } from './stack.formatter';
import { SYMBOLS } from '../../di/symbols';
import { FormatterOptions, LogFormatter, LogLevel } from '../../core';

import { LogIcon } from './types/log-icon.enum';

const LEVEL_FORMATTING: Record<
  LogLevel,
  {
    color: (text: string) => string;
    icon: LogIcon;
  }
> = {
  [LogLevel.Error]: {
    icon: LogIcon.Error,
    color: chalk.redBright,
  },
  [LogLevel.Warn]: {
    icon: LogIcon.Warn,
    color: chalk.yellowBright,
  },
  [LogLevel.Info]: {
    icon: LogIcon.Info,
    color: chalk.greenBright,
  },
  [LogLevel.Debug]: {
    icon: LogIcon.Default,
    color: chalk.magentaBright,
  },
};

@injectable()
export class DevelopmentFormatter implements LogFormatter {
  private readonly options: FormatterOptions;

  constructor(
    @inject(SYMBOLS.FormatterOptions)
    @optional()
    options?: Partial<FormatterOptions>,
  ) {
    this.options = {
      timestamp: true,
      maxStackFrames: 3,
      ...options,
    };
  }

  format(
    level: LogLevel,
    message: string,
    context?: Record<string, unknown>,
  ): string {
    const formatting = LEVEL_FORMATTING[level];
    const timestamp = this.options.timestamp ? new Date() : '';

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
        const { stack: _, ...restContext } = context;
        context = Object.keys(restContext).length > 0 ? restContext : undefined;
      }
    }

    if (context) {
      output += formatContext(context);
    }

    if (stack) {
      output += formatStack(stack, this.options.maxStackFrames);
    }

    return output;
  }

  formatError(
    error: unknown,
    context?: Record<string, unknown>,
  ): Record<string, unknown> {
    if (error instanceof Error) {
      return {
        message: error.message,
        name: error.name,
        stack: error.stack,
        cause: error.cause ? this.formatError(error.cause) : undefined,
        ...context,
      };
    }

    if (typeof error === 'string') {
      return {
        message: error,
        ...context,
      };
    }

    if (typeof error === 'object' && error !== null) {
      return {
        ...(error as Record<string, unknown>),
        ...context,
      };
    }

    return {
      rawError: error,
      type: typeof error,
      ...context,
    };
  }
}
