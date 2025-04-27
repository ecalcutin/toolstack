import { LogLevel, LoggerFactory, LoggerOptions, Logger } from './index';

describe('Logger index exports', () => {
  describe('Enums', () => {
    it('should export LogLevel enum', () => {
      expect(LogLevel).toBeDefined();
      expect(typeof LogLevel).toBe('object');
    });
  });

  describe('Classes/Functions', () => {
    it('should export LoggerFactory', () => {
      expect(LoggerFactory).toBeDefined();
      expect(typeof LoggerFactory).toBe('function');
    });
  });

  describe('Type exports', () => {
    it('should export Logger type', () => {
      // Types cannot be directly tested at runtime, but we can verify
      // the TypeScript compiler accepts them by creating a type annotation
      const typeCheck = (logger: Logger): Logger => logger;
      expect(typeCheck).toBeDefined();
    });

    it('should export LoggerOptions type', () => {
      // Types cannot be directly tested at runtime, but we can verify
      // the TypeScript compiler accepts them by creating a type annotation
      const typeCheck = (options: LoggerOptions): LoggerOptions => options;
      expect(typeCheck).toBeDefined();
    });
  });
});
