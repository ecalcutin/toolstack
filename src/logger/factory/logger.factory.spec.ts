import { LoggerFactory } from './logger.factory';
import * as DiContainer from '../di/container';
import { LogLevel } from '../core';
import { SYMBOLS } from '../di/symbols';

jest.mock('../di/container');

describe('LoggerFactory', () => {
  const mockLogger = {
    debug: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  };

  const mockContainer = {
    get: jest.fn().mockReturnValue(mockLogger),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (DiContainer.createContainer as jest.Mock).mockReturnValue(mockContainer);
  });

  describe('create', () => {
    it('should create a logger with default options', () => {
      // Act
      const logger = LoggerFactory.create();

      // Assert
      expect(DiContainer.createContainer).toHaveBeenCalledWith(undefined);
      expect(mockContainer.get).toHaveBeenCalledWith(SYMBOLS.Logger);
      expect(logger).toBe(mockLogger);
    });

    it('should create a logger with custom options', () => {
      // Arrange
      const options = { level: LogLevel.Error };

      // Act
      const logger = LoggerFactory.create(options);

      // Assert
      expect(DiContainer.createContainer).toHaveBeenCalledWith(options);
      expect(mockContainer.get).toHaveBeenCalledWith(SYMBOLS.Logger);
      expect(logger).toBe(mockLogger);
    });
  });
});
