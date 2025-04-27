import chalk from 'chalk';

import { formatContext } from './context.formatter';

jest.mock('chalk', () => ({
  gray: jest.fn().mockImplementation(text => `gray${text}`),
  green: jest.fn().mockImplementation(text => `green${text}`),
  cyan: jest.fn().mockImplementation(text => `cyan${text}`),
  magenta: jest.fn().mockImplementation(text => `magenta${text}`),
  white: jest.fn().mockImplementation(text => `white${text}`),
  hex: () => jest.fn().mockImplementation(text => `hex${text}`),
}));

describe('formatContext', () => {
  it('should return an empty string for invalid context', () => {
    // @ts-expect-error invalid param check
    expect(formatContext(null)).toBe('');
    // @ts-expect-error invalid param check
    expect(formatContext(undefined)).toBe('');
    // @ts-expect-error invalid param check
    expect(formatContext('string')).toBe('');
    // @ts-expect-error invalid param check
    expect(formatContext(123)).toBe('');
    // @ts-expect-error invalid param check
    expect(formatContext(true)).toBe('');
    // @ts-expect-error invalid param check
    expect(formatContext([])).toBe('');
  });

  it('should return an empty string for empty object', () => {
    expect(formatContext({})).toBe('');
  });

  it('should format simple key-value pairs correctly', () => {
    const context = {
      name: 'John',
      age: 30,
      active: true,
    };

    const result = formatContext(context);
    // Test for keys presence
    expect(result).toContain(chalk.hex('#')('name'));
    expect(result).toContain(chalk.hex('#')('age'));
    expect(result).toContain(chalk.hex('#')('active'));

    // Test for value presence
    expect(result).toContain(chalk.green('John'));
    expect(result).toContain(chalk.cyan(30));
    expect(result).toContain(chalk.magenta(true));
  });

  it('should handle complex objects by stringifying them', () => {
    const context = {
      address: {
        street: 'Main',
        number: 123,
      },
    };

    const result = formatContext(context);
    expect(result).toContain(chalk.white(JSON.stringify(context.address)));
  });

  it('should properly align keys of different lengths', () => {
    const context = {
      short: 1,
      veryLongKeyName: 2,
    };

    const result = formatContext(context);
    const maxLength = Math.max(...Object.keys(context).map(k => k.length));

    Object.keys(context).forEach(key => {
      const padding = ' '.repeat(maxLength - key.length);
      expect(result).toContain(`${key}${padding}`);
    });
  });

  it('should include the correct prefix for each line', () => {
    const context = {
      test: 'value',
    };

    const result = formatContext(context);
    expect(result).toContain(`${chalk.gray('│')}  `);
  });
});
