export interface TextStyler {
  cyan(text: string): string;
  gray(text: string): string;
  green(text: string): string;
  red(text: string): string;
  magenta(text: string): string;
  white(text: string): string;
  greenBright(text: string): string;
  magentaBright(text: string): string;
  redBright(text: string): string;
  yellowBright(text: string): string;
}
