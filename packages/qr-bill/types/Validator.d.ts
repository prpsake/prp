import {QRBillInit} from "./Data";


/**
 * Validate the qr-bill data. Errors, resp. invalid data items are visualized and do not throw. NB(29.10.22):
 * Error handling is incomplete and will change in the near future.
 *
 * @param data - The qr-bill data.
 * @returns QRBillInit - The validated qr-bill data.
 */
function validate(data: QRBillInit): QRBillInit

