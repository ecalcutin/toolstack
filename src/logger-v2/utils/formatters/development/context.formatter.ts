import chalk from 'chalk';

import { LOG_PARTS } from './constants';

export const formatContext = (context: Record<string, unknown>): string => {
  const entries = Object.entries(context);
  if (entries.length === 0) return '';

  const maxKeyLength = Math.max(...entries.map(([key]) => key.length));
  const rows = entries.map(([key, value]) => {
    const formattedKey = chalk.yellowBright(key.padEnd(maxKeyLength));
    const formattedValue = colorizeValue(value);

    return [LOG_PARTS.VERTICAL_LINE, formattedKey, formattedValue].join(' ');
  });

  return rows.join('\n');
};

const colorizeValue = (value: unknown): string => {
  switch (typeof value) {
    case 'string':
      return chalk.green(value);
    case 'number':
      return chalk.cyan(value);
    case 'boolean':
      return chalk.magenta(value);
    default:
      return chalk.white(JSON.stringify(value));
  }
};
