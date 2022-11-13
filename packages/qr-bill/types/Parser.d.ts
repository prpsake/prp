import {Init} from "./Data";


/**
 * Parse a json string object or plain object.
 *
 * @param {string | object} x - A JSON string object or plain object.
 * @return {Init} - The parsed qr-bill data.
 */
export function parse(x: string | object): Init
