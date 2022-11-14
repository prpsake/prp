import {Init} from "./Data";


/**
 * Parse a string or plain object.
 *
 * @param {string | Record<string, any>} x - A JSON string object or plain object.
 * @return {Init} - The parsed qr-bill data.
 */
export function parse(x: string | Record<string, any>): Init
