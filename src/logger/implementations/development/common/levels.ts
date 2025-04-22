import chalk from 'chalk';
import { Level, LogIcon } from '../../common.interface';

export const LevelIcons = {
  [Level.Fatal]: LogIcon.Fatal,
  [Level.Error]: LogIcon.Error,
  [Level.Warn]: LogIcon.Warn,
  [Level.Info]: LogIcon.Info,
  [Level.Verbose]: LogIcon.Info,
  [Level.Debug]: LogIcon.Info,
};

export const LevelColors = {
  [Level.Fatal]: chalk.red,
  [Level.Error]: chalk.redBright,
  [Level.Warn]: chalk.yellowBright,
  [Level.Info]: chalk.greenBright,
  [Level.Verbose]: chalk.cyanBright,
  [Level.Debug]: chalk.magentaBright,
};
