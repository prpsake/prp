import {Data} from "./index";


/**
 * Set a boolean qr-bill data property by values of one or more properties specified in `otherKeys`.
 * @example ```
 * {
 *    showReference: showWith({ referenceType: "SCOR" }, { referenceType: ["QRR", "SCOR"] }),
 *    // Read: do show the reference part if referenceType equals "QRR" or "SCOR". As this is the case here,
 *    // showReference is true and the part is shown.
 * };
 * ```
 * @param {Data.QRBill} data - The qr-bill data.
 * @param {{[key in keyof Data.QRBill]?: string[]}} otherKeys - A subset of the qr-bill data keys with values set as a
 * value array to be checked against the actual value.
 * @return {boolean}
 */
export function showWith(data: Data.QRBill, otherKeys: { [key in keyof Data.QRBill]?: string[] }): boolean


/**
 * Set a boolean qr-bill data property by values of one or more properties specified in `otherKeys`.
 * @example ```
 * {
 *    showAdditionalInfo: notShowWith({ message: "Invoice 00122" }, { message: [""], messageCode: [""] }),
 *    // Read: do not show the additional info part if message equals "" and messageCode equals "". As this is not
 *    // the case here, showAdditionalInfo is true and the part is shown.
 *
 *    showQRCode: notShowWith({ qrCodeString: "" }, { qrCodeString: [""] }),
 *    // Read: do not show the qr-code part if qrCodeString equals "". As this is the case here, showQRCode is false
 *    // and the part is not shown.
 * };
 * ```
 * @param {Data.QRBill} data - The qr-bill data.
 * @param {{[key in keyof Data.QRBill]?: string[]}} otherKeys - A subset of the qr-bill data keys with values set as a
 *   value array to be checked against the actual value.
 * @return {boolean}
 */
export function notShowWith(data: Data.QRBill, otherKeys: { [key in keyof Data.QRBill]?: string[] }): boolean


/**
 * Transform the qr-bill data. Optionally validate and format the data according the swiss qr-bill
 * specification.
 * @see Validator.validate
 *
 * @example ```
 * modelQR({
 *   data: {...data, iban: data.creditor.iban},
 *   validate: true,
 *   format: true
 * })
 * ```
 *
 * @param {Data.QRBillInit} param.data - The input data to be transformed.
 * @param {boolean} param.validate - Whether to validate the input data.
 * @param {boolean} param.format - Whether to format the input data.
 * @return {Data.QRBill & Data.QRBillControl} - The transformed data.
 */
export function modelQR(param: { data: Data.QRBillInit, validate: boolean, format: boolean }): Data.QRBill & Data.QRBillControl
