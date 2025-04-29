import { LogLevel } from '../types';

import { Format } from './formatter.interface';
import { Transport } from './transport.interface';

export interface LoggerOptions {
  level?: LogLevel;
  transports?: Transport[];
  format?: Format;
}
