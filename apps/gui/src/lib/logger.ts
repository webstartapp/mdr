/**
 * Simple LoggerService to satisfy project standards.
 */
export const LoggerService = {
  log: (message: string, ...args: unknown[]): void => {
    // eslint-disable-next-line no-console
    console.log(`[LOG] ${message}`, ...args);
  },
  error: (message: string, error?: unknown): void => {
    // eslint-disable-next-line no-console
    console.error(`[ERROR] ${message}`, error);
  },
  warn: (message: string, ...args: unknown[]): void => {
    // eslint-disable-next-line no-console
    console.warn(`[WARN] ${message}`, ...args);
  },
};
