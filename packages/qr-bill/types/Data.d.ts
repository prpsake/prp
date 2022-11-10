export type QrBillBase = {
  lang?: "fr" | "it" | "de" | "en"
  currency: "CHF" | "EUR"
  amount?: string | number
  iban: string
  referenceType?: string
  reference?: string
  message?: string
  messageCode?: string
}


export type QrBillAddress = {
  // NB(28.10.22): By swiss-qr-bill-spec `addressType` can also be "S" (separated address items) but only "K" (combined
  // address items) are handled at the moment. See Parser.res and Validator.res.
  addressType?: "K"
  name: string
  street?: string
  streetNumber?: string | number
  postOfficeBox?: string | number
  postalCode: string | number
  locality: string
  countryCode: string
}


export type QrBillInit = QrBillBase & {
  creditor: QrBillAddress
  debtor?: QrBillAddress
}


export type QrBill = QrBillBase & {
  creditorName: string
  creditorCountryCode: string
  creditorAddressLine1: string
  creditorAddressLine2: string
  debtorName: string
  debtorAddressLine1: string
  debtorAddressLine2: string
  debtorCountryCode: string
}


export type QrBillComponent = QrBill & {
  qrCodeString: string
  showQRCode: boolean
  showAmount: boolean
  showDebtor: boolean
  showAdditionalInfo: boolean
  showReference: boolean
  reduceContent: boolean
}


export const defaultAddressData: QrBillAddress
export const defaultData: QrBillInit


/**
 * Transform and extend the qr-bill data for the hybrids web component.
 *
 * @param {QrBillInit} data - The input data to be transformed.
 * @return {QrBillComponent} - The transformed data.
 */
export function component(data: QrBillInit): QrBillComponent
