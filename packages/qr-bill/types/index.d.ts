import type { Component } from "hybrids"

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
  // NB: By swiss-qr-bill-spec `addressType` can also be "S" (separated address items) but only "K" (combined address
  // items) are handled at the moment. See Parser.res and Validator.res.
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
  function showWith(data: QRBill, otherKeys: {[key in keyof QRBill]?: string[]}): boolean
  function notShowWith(data: QRBill, otherKeys: {[key in keyof QRBill]?: string[]}): boolean
  function modelQR(param: { data: QRBillInit, validate: boolean, format: boolean }): QRBill & QRBillControl
}


export namespace Parser {
  function parseJson(str: string): QRBillInit
}


export namespace Validator {
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
