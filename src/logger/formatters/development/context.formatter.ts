import chalk from 'chalk';

import { LogContext } from '~/logger/core';

export const formatContext = (context: LogContext): string => {
  const entries = Object.entries(context);

  if (entries.length === 0) {
    return '';
  }

  const maxKeyLength = Math.max(...entries.map(([key]) => key.length));

  const rows = entries.map(([key, value]) => {
    const formattedKey = chalk.hex('#FF9F43')(key.padEnd(maxKeyLength));

    let formattedValue: string;
    switch (typeof value) {
      case 'string':
        formattedValue = chalk.green(value);
        break;
      case 'number':
        formattedValue = chalk.cyan(value);
        break;
      case 'boolean':
        formattedValue = chalk.magenta(value);
        break;
      default:
        formattedValue = chalk.white(JSON.stringify(value));
    }

    return `${chalk.gray('│')}  ${formattedKey}  ${formattedValue}`;
  });

  return `\n${rows.join('\n')}`;
};
