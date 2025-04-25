require('reflect-metadata');

// Then import your library
const { LoggerFacade } = require('./dist');

// Use the logger
try {
  const logger = LoggerFacade.create();
  logger.info('Test message', { test: true });
  logger.warn('Warning message');
  logger.error(new Error('Test error'));
} catch (error) {
  console.error('Error using logger:', error);
}
