import type {Component} from "hybrids"


type QRBillBase = {
  lang?: string
  currency: string
  amount?: string
  iban: string
  referenceType?: string
  reference?: string
  message?: string
  messageCode?: string
}


type QRBillAddress = {
  // NB(28.10.22): By swiss-qr-bill-spec `addressType` can also be "S" (separated address items) but only "K" (combined
  // address items) are handled at the moment. See Parser.res and Validator.res.
  addressType?: "K"
  name: string
  street: string
  streetNumber: string
  postOfficeBox?: string
  postalCode: string
  locality: string
  countryCode: string
}


type QRBillInit = QRBillBase & {
  creditor: QRBillAddress
  debtor?: QRBillAddress
}


type QRBillControl = {
  showQRCode: boolean
  showAmount: boolean
  showDebtor: boolean
  showAdditionalInfo: boolean
  showReference: boolean
  reduceContent: boolean
}


type QRBill = QRBillBase & {
  creditorName: string
  creditorCountryCode: string
  creditorAddressLine1: string
  creditorAddressLine2: string
  debtorName: string
  debtorAddressLine1: string
  debtorAddressLine2: string
  debtorCountryCode: string
  qrCodeString: string
}


type Element<E> = Component<E>


export namespace Helpers {
  /**
   * Set a boolean qr-bill data property by values of one or more properties specified in `otherKeys`.
   * @example ```
   * {
   *    showReference: showWith({ referenceType: "SCOR" }, { referenceType: ["QRR", "SCOR"] }),
   *    // Read: do show the reference part if referenceType equals "QRR" or "SCOR". As this is the case here,
   *    // showReference is true and the part is shown.
   * };
   * ```
   * @param {QRBill} data - The qr-bill data.
   * @param {{[key in keyof QRBill]?: string[]}} otherKeys - A subset of the qr-bill data keys with values set as a
   *   value array to be checked against the actual value.
   * @returns boolean
   */
  function showWith(data: QRBill, otherKeys: { [key in keyof QRBill]?: string[] }): boolean


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
   * @param {QRBill} data - The qr-bill data.
   * @param {{[key in keyof QRBill]?: string[]}} otherKeys - A subset of the qr-bill data keys with values set as a
   *   value array to be checked against the actual value.
   * @returns boolean
   */
  function notShowWith(data: QRBill, otherKeys: { [key in keyof QRBill]?: string[] }): boolean


  /**
   * Transform the qr-bill data. Optionally validate and format the data according the swiss qr-bill
   * specification.
   *
   * @example ```
   * modelQR({
   *   data: {...data, iban: data.creditor.iban},
   *   validate: true,
   *   format: true
   * })
   * ```
   *
   * @param {QRBillInit} param.data - The input data to be transformed.
   * @param {boolean} param.validate - Whether to validate the input data.
   * @param {boolean} param.format - Whether to format the input data.
   * @returns {QRBill & QRBillControl} - The transformed data.
   */
  function modelQR(param: { data: QRBillInit, validate: boolean, format: boolean }): QRBill & QRBillControl
}


export namespace Parser {
  /**
   * Parse the qr-bill JSON string.
   *
   * @param str - The JSON string.
   * @returns QRBillInit - The parsed qr-bill data.
   */
  function parseJson(str: string): QRBillInit
}


export namespace Validator {
  /**
   * Validate the qr-bill data. Errors, resp. invalid data items are visualized and do not throw. NB(29.10.22):
   * Error handling is incomplete and will change in the near future.
   *
   * @param data - The qr-bill data.
   * @returns QRBillInit - The validated qr-bill data.
   */
  function validate(data: QRBillInit): QRBillInit
}


export namespace Formatter {
  function removeWhitespace(str: string): string


  function blockStr3(str: string): string


  function blockStr4(str: string): string


  function blockStr5(str: string): string


  function referenceBlockStr(str: string): string


  function moneyFromNumberStr2(str: string): string
}


export namespace Data {
  const defaultAddressData: QRBillAddress
  const defaultData: QRBillInit


  function entries(data: QRBillInit): string[][]


  function object(data: QRBillInit): QRBill
}


type QRCodeOptions = {
  ecl: "L" | "M" | "Q" | "H",
  width: number,
  height: number,
  padding: number
}


export namespace QRCode {
  function pathDataFromString(content: string, options: QRCodeOptions): string
}
