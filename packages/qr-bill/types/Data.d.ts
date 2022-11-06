export type QRBillBase = {
  lang?: "fr" | "it" | "de" | "en"
  currency: "CHF" | "EUR"
  amount?: string | number
  iban: string
  referenceType?: string
  reference?: string
  message?: string
  messageCode?: string
}


export type QRBillAddress = {
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


export type QRBillInit = QRBillBase & {
  creditor: QRBillAddress
  debtor?: QRBillAddress
}


export type QRBillControl = {
  showQRCode: boolean
  showAmount: boolean
  showDebtor: boolean
  showAdditionalInfo: boolean
  showReference: boolean
  reduceContent: boolean
}


export type QRBill = QRBillBase & {
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

export const defaultAddressData: QRBillAddress
export const defaultData: QRBillInit


export function entries(data: QRBillInit): string[][]


export function object(data: QRBillInit): QRBill
