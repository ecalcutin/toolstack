import { ChalkStyler } from '~/logger/adapters';

import { LOG_ICONS, LOG_PARTS } from './constants';

const isExternalModule = (line: string): boolean => {
  return /node_modules/.test(line);
};

const isInternalModule = (line: string): boolean => {
  return /node:internal/.test(line);
};

export const formatStack = (
  stack: unknown,
  maxStackFrames: number = 5,
): string => {
  if (typeof stack !== 'string') return '';
  if (!stack) return '';

  const lines = stack.split('\n');

  const errorLine = ChalkStyler.red(
    `\n${ChalkStyler.gray('└─')}${LOG_ICONS.Error} ${lines[0]}`,
  );

  const visibleFrames = lines.slice(1, maxStackFrames).map((line, i) => {
    const { icon, text } = formatStackLine(line);
    const arrow = i === 0 ? LOG_ICONS.ArrowRight : LOG_ICONS.ArrowSub;
    return `     ${arrow} ${icon} ${text}`;
  });

  let counter = '';

  if (lines.length > maxStackFrames) {
    const hiddenCount = lines.length - maxStackFrames;
    counter = `     ${LOG_PARTS.CORNER_LINE}${LOG_ICONS.Refresh} (${hiddenCount} more ${hiddenCount === 1 ? 'frame' : 'frames'})`;
  }

  return [errorLine, ...visibleFrames, counter].join('\n');
};

const formatStackLine = (line: string): { icon: string; text: string } => {
  const cleaned = line
    .trim()
    .replace(/^at /, '')
    .replace(/:(\d+):\d+/, ':$1')
    .replace(process.cwd(), '~');

  if (isExternalModule(cleaned)) {
    return {
      icon: LOG_ICONS.Package,
      text: cleaned.replace(/node_modules\/([^/]+)\/.*?\/([^/]+)$/, '[$1]/$2'),
    };
  }
  if (isInternalModule(line)) {
    return {
      icon: LOG_ICONS.InternalPackage,
      text: cleaned,
    };
  }

  return {
    icon: LOG_ICONS.File,
    text: cleaned.replace(/file.*?~/, '~'),
  };
};
