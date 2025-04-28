import chalk from 'chalk';

import { TextStyler } from '../core/interfaces';

class ChalkStyler implements TextStyler {
  public readonly cyan = chalk.cyan;
  public readonly gray = chalk.gray;
  public readonly green = chalk.green;
  public readonly red = chalk.red;
  public readonly magenta = chalk.magenta;
  public readonly white = chalk.white;
  public readonly cyanBright = chalk.cyanBright;
  public readonly greenBright = chalk.greenBright;
  public readonly magentaBright = chalk.magentaBright;
  public readonly redBright = chalk.redBright;
  public readonly yellowBright = chalk.yellowBright;
}

export default new ChalkStyler();
