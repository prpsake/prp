import type { Component } from "hybrids"


type BaseData = {
  lang?: string
  currency: string
  amount?: string
  iban: string
  referenceType?: string
  reference?: string
  message?: string
  messageCode?: string
}


type InputAddressData = {
  readonly addressType: string
  name: string
  street: string
  streetNumber: string
  postOfficeBox?: string
  postalCode: string
  locality: string
  countryCode: string
}


export type InputData = BaseData & {
  creditor: InputAddressData
  debtor?: InputAddressData
} & { [key: string]: any }


type QRData = BaseData & {
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


type QRControlData = {
  showQRCode: boolean
  showAmount: boolean
  showDebtor: boolean
  showAdditionalInfo: boolean
  showReference: boolean
  reduceContent: boolean
}


type Element<E> = Component<E>


declare module Helpers {
  function showWith(data: QRData, otherKeys: {[key in keyof QRData]?: string[]}): boolean
  function notShowWith(data: QRData, otherKeys: {[key in keyof QRData]?: string[]}): boolean
  function modelQR<M>(param: { data: M, validate: boolean, format: boolean }): QRData & QRControlData
}


declare module Parser {
  function parseJson(str: string): InputData
}


declare module Validator {
  function validate(data: InputData): InputData
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
  const defaultAddressData: InputAddressData
  const defaultData: InputData
  function entries(data: InputData): string[][]
  function object(data: InputData): QRData
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
