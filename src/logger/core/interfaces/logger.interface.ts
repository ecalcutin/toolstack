import { Format } from './formatter.interface';
import { Transport } from './transport.interface';

export interface LoggerOptions {
  transports?: Transport[];
  format?: Format;
}
