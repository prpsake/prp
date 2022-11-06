import {Data} from "./index";


/**
 * Parse the qr-bill JSON string.
 *
 * @param {string} str - The JSON string.
 * @return {Data.QRBillInit} - The parsed qr-bill data.
 */
export function parseJson(str: string): Data.QRBillInit
