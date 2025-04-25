export { Logger } from './core';

export type { LogLevel, LoggerOptions } from './core/logger.types';

export { formatError, extractErrorContext } from './utils';

export { LoggerFacade } from './facade';

import { LoggerFacade } from './facade';

export const logger = LoggerFacade.create();
