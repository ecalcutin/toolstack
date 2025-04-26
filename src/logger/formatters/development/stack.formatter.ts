import chalk from 'chalk';
import { LogIcon } from './constants';

const formatStackLine = (line: string): { icon: string; text: string } => {
  let cleaned = line
    .trim()
    .replace(/^at /, '')
    .replace(/:(\d+):\d+/, ':$1');

  cleaned = cleaned
    .replace(process.cwd(), '~')
    .replace(/node_modules\/([^/]+)\/.*?\/([^/]+)$/, '[$1]/$2');

  const isProjectFile = cleaned.startsWith('~/');

  return {
    icon: isProjectFile ? LogIcon.File : LogIcon.Package,
    text: cleaned,
  };
};

export const formatStack = (stack: unknown, maxStackFrames = 3): string => {
  const stackString = typeof stack === 'string' ? stack : String(stack);
  if (!stackString) return '';

  const lines = stackString.split('\n');
  const errorLine = chalk.red(
    `\n${chalk.gray('└─')}${LogIcon.Error} ${lines[0]}`,
  );

  const visibleFrames = lines.slice(1, maxStackFrames).map((line, i) => {
    const { icon, text } = formatStackLine(line);
    const arrow = i === 0 ? LogIcon.ArrowRight : LogIcon.ArrowSub;
    return `     ${chalk.gray(arrow)} ${icon} ${text}`;
  });

  let counter = '';
  if (lines.length > maxStackFrames) {
    const hiddenCount = lines.length - maxStackFrames;
    counter = `     ${chalk.gray('└─')}${LogIcon.Refresh} (${hiddenCount} more ${hiddenCount === 1 ? 'frame' : 'frames'})`;
  }

  return [errorLine, ...visibleFrames, counter].filter(Boolean).join('\n');
};
