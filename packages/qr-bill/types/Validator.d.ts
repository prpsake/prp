import {Data} from "./index";


/**
 * Validate the qr-bill data. Errors, resp. invalid data items are visualized and do not throw. NB(29.10.22):
 * Error handling is incomplete and will change in the near future.
 *
 * @param {Data.QRBillInit} data - The qr-bill data.
 * @return {Data.QRBillInit} - The validated qr-bill data.
 */
function validate(data: Data.QRBillInit): Data.QRBillInit
