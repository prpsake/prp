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

type qrBillComponentAddress = {
  addressType: string,
  name: string,
  addressLine1: string,
  addressLine2: string,
  countryCode: string,
}

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

let defaultQrBillAddress: qrBillAddress = {
  addressType: Default({key: "addressType", val: ""}),
  name: Default({key: "name", val: ""}),
  street: Default({key: "street", val: ""}),
  streetNumber: Default({key: "streetNumber", val: ""}),
  postOfficeBox: Default({key: "postOfficeBox", val: ""}),
  postalCode: Default({key: "postalCode", val: ""}),
  locality: Default({key: "locality", val: ""}),
  countryCode: Default({key: "countryCode", val: ""}),
}

let defaultQrBillInit: qrBillInit = {
  lang: Default({key: "lang", val: "en"}),
  currency: None,
  amount: None,
  iban: None,
  referenceType: Default({key: "referenceType", val: "NON"}),
  reference: None,
  message: None,
  messageCode: None,
  creditor: Default({key: "creditor", val: defaultQrBillAddress}),
  debtor: Default({key: "debtor", val: defaultQrBillAddress}),
}

let fold: dataOption<string> => string = o =>
  switch o {
  | User({val}) => val
  | Default({val}) => val
  | Error({val}) => {
      Js.log("Error: " ++ val)
      ""
    }
  | None => ""
  }

let componentQrCodeString: qrBillComponent => string =
  d =>
  [
    // header
    "SPC",
    "0200",
    "1",
    // account
    d.iban,
    // creditor
    d.creditorAddressType,
    d.creditorName,
    d.creditorAddressLine1,
    d.creditorAddressLine2,
    "",
    "",
    d.creditorCountryCode,
    // ultimate creditor (future FEATURE)
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    // payment amount information
    d.amount,
    d.currency,
    // ultimate debtor
    d.debtorAddressType,
    d.debtorName,
    d.debtorAddressLine1,
    d.debtorAddressLine2,
    "",
    "",
    d.debtorCountryCode,
    // reference
    d.referenceType,
    d.reference,
    // additional information
    d.message,
    "EPD",
    d.messageCode,
    // alternative information (IMPLEMENT)
    "",
    "",
  ]
  ->Js.Array2.joinWith("\n")

let componentAddress: dataOption<qrBillAddress> => qrBillComponentAddress =
  d =>
  switch d {
  | User({val}) => val
  | _ => defaultQrBillAddress
  }->ad => {
    let addressLine1 = switch ad.postOfficeBox {
    | User({val}) => val
    | _ => (ad.street->fold ++ " " ++ ad.streetNumber->fold)->Js.String2.trim
    }

    let addressLine2 = (ad.postalCode->fold ++ " " ++ ad.locality->fold)->Js.String2.trim
    {
      addressType: "K",
      name: ad.name->fold,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      countryCode: ad.countryCode->fold
    }
  }

let component: qrBillInit => qrBillComponent =
  d =>
  ( componentAddress(d.creditor),
    componentAddress(d.debtor),
  )->((
    creditor,
    debtor
  )) => ({
    lang: d.lang->fold,
    currency: d.currency->fold,
    amount: d.amount->fold,
    iban: d.iban->fold,
    referenceType: d.referenceType->fold,
    reference: d.reference->fold,
    message: d.message->fold,
    messageCode: d.messageCode->fold,
    creditorAddressType: creditor.addressType,
    creditorName: creditor.name,
    creditorAddressLine1: creditor.addressLine1,
    creditorAddressLine2: creditor.addressLine2,
    creditorCountryCode: creditor.countryCode,
    debtorAddressType: debtor.addressType,
    debtorName: debtor.name,
    debtorAddressLine1: debtor.addressLine1,
    debtorAddressLine2: debtor.addressLine2,
    debtorCountryCode: debtor.countryCode,
    qrCodeString: "",
    showQRCode: false,
    showAmount: false,
    showDebtor: false,
    showAdditionalInfo: false,
    showReference: false,
    reduceContent: false,
  })->cd => {
    let qrCodeString = componentQrCodeString(cd)
    {
      ...cd,
      amount: cd.amount->Formatter.moneyFromNumberStr2,
      iban: cd.iban->Formatter.blockStr4,
      referenceType: cd.referenceType->Formatter.referenceBlockStr,
      qrCodeString: qrCodeString,
      showQRCode: qrCodeString != "",
      showAmount: cd.amount != "",
      showDebtor: cd.debtorName != "" && cd.debtorAddressLine1 != "" && cd.debtorAddressLine2 != "",
      showAdditionalInfo: cd.message != "" || cd.messageCode != "",
      showReference: cd.referenceType == "QRR" || cd.referenceType == "SCOR",
      reduceContent: false,
    }
  }

