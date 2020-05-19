/**
 * Checks whether the current runtime is a browser
 *
 * @returns {boolean}
 */
export const isBrowser = () => typeof window !== 'undefined';

/**
 * Checks whether the current runtime is a server
 */
export const isServer = () => !isBrowser();
