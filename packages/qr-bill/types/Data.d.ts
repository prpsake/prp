export type DataQrBillBase = {
  lang?: "fr" | "it" | "de" | "en"
  currency: "CHF" | "EUR"
  amount?: string | number
  iban: string
  referenceType?: string
  reference?: string
  message?: string
  messageCode?: string
}


export type DataQrBillAddress = {
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


export type DataQrBillInit = DataQrBillBase & {
  creditor: DataQrBillAddress
  debtor?: DataQrBillAddress
}


export type DataQrBill = DataQrBillBase & {
  creditorName: string
  creditorCountryCode: string
  creditorAddressLine1: string
  creditorAddressLine2: string
  debtorName: string
  debtorAddressLine1: string
  debtorAddressLine2: string
  debtorCountryCode: string
}


export type DataQrBillComponent = DataQrBill & {
  qrCodeString: string
  showQRCode: boolean
  showAmount: boolean
  showDebtor: boolean
  showAdditionalInfo: boolean
  showReference: boolean
  reduceContent: boolean
}


export const defaultAddressData: DataQrBillAddress
export const defaultData: DataQrBillInit


/**
 * Transform and extend the qr-bill data for the hybrids web component.
 *
 * @param {DataQrBillInit} data - The input data to be transformed.
 * @return {DataQrBillComponent} - The transformed data.
 */
export function component(data: DataQrBillInit): DataQrBillComponent
