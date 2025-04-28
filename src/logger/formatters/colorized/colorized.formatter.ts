import { Formatter, LogContext, LogLevel } from '~/logger/core';

import { LEVEL_FORMATTING, LOG_PARTS } from './constants';
import { formatContext } from './context.formatter';
import { formatStack } from './stack.formatter';

export class ColorizedFormatter implements Formatter {
  public format(
    level: LogLevel,
    message: string,
    context?: LogContext & { stack?: string },
  ): string {
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
  }
}
