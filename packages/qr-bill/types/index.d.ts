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
  addressType: string
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


declare module Helpers {
  function showWith(data: QRBill, otherKeys: {[key in keyof QRBill]?: string[]}): boolean
  function notShowWith(data: QRBill, otherKeys: {[key in keyof QRBill]?: string[]}): boolean
  function modelQR<M>(param: { data: M, validate: boolean, format: boolean }): QRBill & QRBillControl
}


declare module Parser {
  function parseJson(str: string): QRBillInit
}


declare module Validator {
  function validate(data: QRBillInit): QRBillInit
}


declare module Formatter {
  function removeWhitespace(str: string): string
  function blockStr3(str: string): string
  function blockStr4(str: string): string
  function blockStr5(str: string): string
  function referenceBlockStr(str: string): string
  function moneyFromNumberStr2(str: string): string
}


declare module Data {
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


declare module QRCode {
  function pathDataFromString(content: string, options: QRCodeOptions): string
}
