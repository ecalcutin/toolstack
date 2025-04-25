import { format } from 'winston';
import chalk from 'chalk';

import { formatContext } from './context.format';
import { formatStack } from './stack.format';

import { Level, LogIcon } from '../../common.interface';
import { LevelColors, LevelIcons } from '../common/levels';

const stdoutFormat = () => {
  return format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format(info => {
      info.level = info.level.toUpperCase();
      return info;
    })(),
    format.printf(info => {
      const levelKey = info.level.toLowerCase() as Level;
      const icon = LevelIcons[levelKey];
      const color = LevelColors[levelKey];

      let output = [
        `${chalk.gray(LogIcon.LogStart)} ${chalk.gray(info.timestamp)}`,
        `${color(icon)} ${info.level.padEnd(5)}`,
        color(info.message),
      ].join(' ');

      if (info.context) {
        output += formatContext(info.context);
      }

      if (info.stack) {
        output += formatStack(info.stack);
      }

      return output;
    }),
  );
};

export default stdoutFormat;
