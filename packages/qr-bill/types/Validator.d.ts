import {Init} from "./Data";


/**
 * Validate the qr-bill data. Errors, resp. invalid data items are visualized and do not throw. NB(29.10.22):
 * Error handling is incomplete and will change in the near future.
 *
 * @param {Init} data - The qr-bill data.
 * @return {Init} - The validated qr-bill data.
 */
export function validate(data: Init): Init
