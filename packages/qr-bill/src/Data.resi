type dataOptionVal<'a> = {key: string, val: 'a}

type dataOption<'a> =
  | User(dataOptionVal<'a>)
  | Default(dataOptionVal<'a>)
  | Error({@as("type") _type: string, key: string, val: string, msg: string})
  | None

type qrBillAddress = {
  addressType: dataOption<string>,
  name: dataOption<string>,
  street: dataOption<string>,
  streetNumber: dataOption<string>,
  postOfficeBox: dataOption<string>,
  postalCode: dataOption<string>,
  locality: dataOption<string>,
  countryCode: dataOption<string>,
}

type qrBillInit = {
  lang: dataOption<string>,
  currency: dataOption<string>,
  amount: dataOption<string>,
  iban: dataOption<string>,
  referenceType: dataOption<string>,
  reference: dataOption<string>,
  message: dataOption<string>,
  messageCode: dataOption<string>,
  creditor: dataOption<qrBillAddress>,
  debtor: dataOption<qrBillAddress>,
}

//type qrBill = {
//  lang: string,
//  currency: string,
//  amount: string,
//  iban: string,
//  referenceType: string,
//  reference: string,
//  message: string,
//  messageCode: string,
//  creditorAddressType: string,
//  creditorName: string,
//  creditorAddressLine1: string,
//  creditorAddressLine2: string,
//  creditorCountryCode: string,
//  debtorAddressType: string,
//  debtorName: string,
//  debtorAddressLine1: string,
//  debtorAddressLine2: string,
//  debtorCountryCode: string,
//  qrCodeString: string,
//}

//type qrBillComponentAddress = {
//  addressType: string,
//  name: string,
//  addressLine1: string,
//  addressLine2: string,
//  countryCode: string,
//}

type qrBillComponent = {
  lang: string,
  currency: string,
  amount: string,
  iban: string,
  referenceType: string,
  reference: string,
  message: string,
  messageCode: string,
  creditorAddressType: string,
  creditorName: string,
  creditorCountryCode: string,
  creditorAddressLine1: string,
  creditorAddressLine2: string,
  debtorAddressType: string,
  debtorName: string,
  debtorAddressLine1: string,
  debtorAddressLine2: string,
  debtorCountryCode: string,
  qrCodeString: string,
  showQRCode: bool,
  showAmount: bool,
  showDebtor: bool,
  showAdditionalInfo: bool,
  showReference: bool,
  reduceContent: bool,
}

let defaultQrBillInit: qrBillInit

let component: qrBillInit => qrBillComponent
