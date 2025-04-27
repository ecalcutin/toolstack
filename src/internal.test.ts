import { Logger } from './logger/core';

const logger = new Logger();

logger.info('Some message');

logger.info('Another message', { env: 'private env' });
