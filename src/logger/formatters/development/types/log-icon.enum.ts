/**
 * Icons used for different parts of the log output
 */
export enum LogIcon {
  Error = '⚡',
  Warn = '⚠️',
  Fatal = '✖',
  Info = 'ℹ️',
  Default = 'ℹ️', // Using the actual value instead of reference to avoid potential issues
  LogStart = '◼',
  Refresh = '🔄',
  File = '📄',
  Package = '📦',
  ArrowRight = '→',
  ArrowSub = '⇢',
}