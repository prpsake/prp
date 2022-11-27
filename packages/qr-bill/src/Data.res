type optSome<'a> = {key: string, val: 'a}

type optErr<'a> = {
  @as("type") _type: string,
  key: string,
  val: 'a,
  msg: string
}

type opt<'a> =
  | User(optSome<'a>)
  | Default(optSome<'a>)
  | Error(optErr<'a>)
  | None

type initAddress = {
  addressType: opt<string>,
  name: opt<string>,
  street: opt<string>,
  streetNumber: opt<string>,
  postOfficeBox: opt<string>,
  postalCode: opt<string>,
  locality: opt<string>,
  countryCode: opt<string>,
}

type init = {
  language: opt<string>,
  currency: opt<string>,
  amount: opt<string>,
  iban: opt<string>,
  referenceType: opt<string>,
  reference: opt<string>,
  message: opt<string>,
  messageCode: opt<string>,
  creditor: opt<initAddress>,
  debtor: opt<initAddress>,
}

type compAddress = {
  addressType: string,
  name: string,
  addressLine1: string,
  addressLine2: string,
  countryCode: string,
}

type comp = {
  language: string,
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

let initAddressDefaults: initAddress = {
  addressType: Default({key: "addressType", val: ""}),
  name: Default({key: "name", val: ""}),
  street: Default({key: "street", val: ""}),
  streetNumber: Default({key: "streetNumber", val: ""}),
  postOfficeBox: Default({key: "postOfficeBox", val: ""}),
  postalCode: Default({key: "postalCode", val: ""}),
  locality: Default({key: "locality", val: ""}),
  countryCode: Default({key: "countryCode", val: ""}),
}

let initDefaults: init = {
  language: Default({key: "language", val: "en"}),
  currency: None,
  amount: None,
  iban: None,
  referenceType: Default({key: "referenceType", val: "NON"}),
  reference: None,
  message: None,
  messageCode: None,
  creditor: Default({key: "creditor", val: initAddressDefaults}),
  debtor: Default({key: "debtor", val: initAddressDefaults}),
}

let compDefaults: comp = {
  language: "en",
  currency: "CHF",
  amount: "",
  iban: "",
  referenceType: "",
  reference: "",
  message: "",
  messageCode: "",
  creditorAddressType: "K",
  creditorName: "",
  creditorCountryCode: "",
  creditorAddressLine1: "",
  creditorAddressLine2: "",
  debtorAddressType: "K",
  debtorName: "",
  debtorAddressLine1: "",
  debtorAddressLine2: "",
  debtorCountryCode: "",
  qrCodeString: "",
  showQRCode: false,
  showAmount: false,
  showDebtor: false,
  showAdditionalInfo: false,
  showReference: false,
  reduceContent: false,
}

let fold: opt<string> => string = o =>
  switch o {
  | User({val}) => val
  | Default({val}) => val
  | Error(_) => ""
  | None => ""
  }

let concat: (. opt<string>, opt<string>, string, string) => opt<string> =
  (. o1, o2, key, joint) =>
  switch (o1, o2) {
  | (User(s1), User(s2) | Default(s2))
  | (Default(s1), User(s2)) => User({
      key: key,
      val: s1.val ++ joint ++ s2.val
    })
  | (Default(s1), Default(s2)) => Default({
      key: key,
      val: s1.val ++ joint ++ s2.val
    })
  | (Error(e), User(s) | Default(s))
  | (User(s) | Default(s), Error(e)) => Error({
      _type: e.key ++ ":" ++ e._type,
      key: key,
      val: e.key ++ ":" ++ e.val ++ ";" ++ s.key ++ ":" ++ s.val,
      msg: e.key ++ ":" ++ e.msg
    })
  | (Error(e1), Error(e2)) => Error({
      _type: e1.key ++ ":" ++ e1._type ++ ";" ++ e2.key ++ ":" ++ e2._type,
      key: key,
      val: e1.key ++ ":" ++ e1.val ++ ";" ++ e2.key ++ ":" ++ e2.val,
      msg: e1.key ++ ":" ++ e1.msg ++ ";" ++ e2.key ++ ":" ++ e2.msg
    })
  | (None, None) => None
  | (None, _) => o2
  | (_, None) => o1
  }

let compQrCodeString: comp => string =
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

let compAddress: opt<initAddress> => compAddress =
  d =>
  switch d {
  | User({val}) => val
  | _ => initAddressDefaults
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

let compAddress_: opt<initAddress> => compAddress =
  d =>
  switch d {
  | User({val}) => val
  | _ => initAddressDefaults
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

let comp: init => comp =
  d => {
    ( compAddress(d.creditor),
      compAddress(d.debtor),
    )->((
      creditor,
      debtor
    )) => ({
      language: d.language->fold,
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
      let qrCodeString = compQrCodeString(cd)
      {
        ...cd,
        amount: cd.amount->Formatter.moneyFromNumberStr2,
        iban: cd.iban->Formatter.blockStr4,
        reference: cd.reference->Formatter.referenceBlockStr,
        qrCodeString: qrCodeString,
        showQRCode: qrCodeString != "",
        showAmount: cd.amount != "",
        showDebtor: cd.debtorName != "" && cd.debtorAddressLine1 != "" && cd.debtorAddressLine2 != "",
        showAdditionalInfo: cd.message != "" || cd.messageCode != "",
        showReference: cd.referenceType == "QRR" || cd.referenceType == "SCOR",
        reduceContent: false,
      }
    }
  }
