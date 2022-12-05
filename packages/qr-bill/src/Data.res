type optSome<'a> = {key: string, val: 'a}

type optErr<'a> = {
  @as("type") _type: string,
  key: string,
  val: 'a,
  msg: Checks.fn
}

type opt<'a> =
  | User(optSome<'a>)
  | Default(optSome<'a>)
  | Error(optErr<'a>)

type address = {
  addressType: opt<string>,
  name: opt<string>,
  street: opt<string>,
  houseNumber: opt<string>,
  postCode: opt<string>,
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
  creditor: opt<address>,
  debtor: opt<address>,
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
  creditorStreet: string,
  creditorHouseNumber: string,
  creditorPostCode: string,
  creditorLocality: string,
  creditorCountryCode: string,
  debtorAddressType: string,
  debtorName: string,
  debtorStreet: string,
  debtorHouseNumber: string,
  debtorPostCode: string,
  debtorLocality: string,
  debtorCountryCode: string,
  qrCodeString: string,
  showQRCode: bool,
  showAmount: bool,
  showDebtor: bool,
  showAdditionalInfo: bool,
  showReference: bool,
  reduceContent: bool,
  error: array<optErr<string>>
}

let initMandatoryAddressDefaults: address = {
  addressType: Default({key: "addressType", val: "S"}),
  name: Error({
    _type: "CONSTRAINT",
    key: "name",
    val: "",
    msg: (.) => "must be set"
  }),
  street: Default({key: "street", val: ""}),
  houseNumber: Default({key: "houseNumber", val: ""}),
  postCode: Default({key: "postCode", val: ""}),
  locality: Error({
    _type: "CONSTRAINT",
    key: "locality",
    val: "",
    msg: (.) => "must be set"
  }),
  countryCode: Error({
    _type: "CONSTRAINT",
    key: "countryCode",
    val: "",
    msg: (.) => "must be set"
  }),
}

let initOptionalAddressDefaults: address = {
  addressType: Default({key: "addressType", val: ""}),
  name: Default({key: "name", val: ""}),
  street: Default({key: "street", val: ""}),
  houseNumber: Default({key: "houseNumber", val: ""}),
  postCode: Default({key: "postCode", val: ""}),
  locality: Default({key: "locality", val: ""}),
  countryCode: Default({key: "countryCode", val: ""}),
}

let initDefaults: init = {
  language: Default({key: "language", val: "en"}),
  currency: Error({
    _type: "CONSTRAINT",
    key: "currency",
    val: "",
    msg: (.) => "must be set"
  }),
  amount: Default({key: "amount", val: ""}),
  iban: Error({
    _type: "CONSTRAINT",
    key: "iban",
    val: "",
    msg: (.) => "must be set"
  }),
  referenceType: Default({key: "referenceType", val: "NON"}),
  reference: Default({key: "reference", val: ""}),
  message: Default({key: "message", val: ""}),
  messageCode: Default({key: "messageCode", val: ""}),
  creditor: Error({
    _type: "CONSTRAINT",
    key: "creditor",
    val: initMandatoryAddressDefaults,
    msg: (.) => "must be set"
  }),
  debtor: Default({key: "debtor", val: initOptionalAddressDefaults}),
}

let compErrorDefaults: optErr<string> = {_type: "", key: "", val: "", msg: (.) => ""}

let compDefaults: comp = {
  language: "en",
  currency: "",
  amount: "",
  iban: "",
  referenceType: "NON",
  reference: "",
  message: "",
  messageCode: "",
  creditorAddressType: "S",
  creditorName: "",
  creditorStreet: "",
  creditorHouseNumber: "",
  creditorPostCode: "",
  creditorLocality: "",
  creditorCountryCode: "",
  debtorAddressType: "",
  debtorName: "",
  debtorStreet: "",
  debtorHouseNumber: "",
  debtorPostCode: "",
  debtorLocality: "",
  debtorCountryCode: "",
  qrCodeString: "",
  showQRCode: false,
  showAmount: false,
  showDebtor: false,
  showAdditionalInfo: false,
  showReference: false,
  reduceContent: false,
  error: [compErrorDefaults]
}

let foldString: opt<string> => string = o =>
  switch o {
  | User({val})
  | Default({val}) => val
  | Error(_) => ""
  }

let foldAddress: opt<address> => address = o =>
  switch o {
  | User({val})
  | Default({val})
  | Error({val}) => val
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
    d.creditorStreet,
    d.creditorHouseNumber,
    d.creditorPostCode,
    d.creditorLocality,
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
    d.debtorStreet,
    d.debtorHouseNumber,
    d.debtorPostCode,
    d.debtorLocality,
    d.debtorCountryCode,
    // reference
    d.referenceType,
    d.reference,
    // additional information
    d.message,
    "EPD",
    d.messageCode,
    // IMPLEMENT: alternative information
    "",
    "",
  ]
  ->Js.Array2.joinWith("\n")

let compPostCode: string => string => string =
  countryCode =>
  postCode =>
  switch countryCode {
  | "CH" | "" => postCode
  | _ => countryCode ++ "-" ++ postCode
  }

let comp: init => comp =
  d => {
    ( foldAddress(d.creditor),
      foldAddress(d.debtor),
    )->((
      creditor,
      debtor
    )) => ({
      language: d.language->foldString,
      currency: d.currency->foldString,
      amount: d.amount->foldString,
      iban: d.iban->foldString,
      referenceType: d.referenceType->foldString,
      reference: d.reference->foldString,
      message: d.message->foldString,
      messageCode: d.messageCode->foldString,
      creditorAddressType: creditor.addressType->foldString,
      creditorName: creditor.name->foldString,
      creditorStreet: creditor.street->foldString,
      creditorHouseNumber: creditor.houseNumber->foldString,
      creditorPostCode: creditor.postCode->foldString,
      creditorLocality: creditor.locality->foldString,
      creditorCountryCode: creditor.countryCode->foldString,
      debtorAddressType: debtor.addressType->foldString,
      debtorName: debtor.name->foldString,
      debtorStreet: debtor.street->foldString,
      debtorHouseNumber: debtor.houseNumber->foldString,
      debtorPostCode: debtor.postCode->foldString,
      debtorLocality: debtor.locality->foldString,
      debtorCountryCode: debtor.countryCode->foldString,
      qrCodeString: "",
      showQRCode: false,
      showAmount: false,
      showDebtor: false,
      showAdditionalInfo: false,
      showReference: false,
      reduceContent: false,
      error: [
        d.language,
        d.currency,
        d.amount,
        d.iban,
        d.referenceType,
        d.reference,
        d.message,
        d.messageCode,
        creditor.addressType,
        creditor.name,
        creditor.street,
        creditor.houseNumber,
        creditor.postCode,
        creditor.locality,
        creditor.countryCode,
        debtor.addressType,
        debtor.name,
        debtor.street,
        debtor.houseNumber,
        debtor.postCode,
        debtor.locality,
        debtor.countryCode,
      ]
      ->Js.Array2.filter(x => switch x {
        | Error(_) => true
        | _ => false
        })
      ->Js.Array2.map(x => switch x {
        | Error(e) => e
        | _ => compErrorDefaults // NB: never reached
        })
    })->cd => {
      if Js.Array2.length(cd.error) > 0 {
        cd.qrCodeString
      } else {
        compQrCodeString(cd)
      }->qrCodeString => {
        ...cd,
        amount: cd.amount->Formatter.moneyFromNumberStr2,
        iban: cd.iban->Formatter.blockStr4,
        reference: cd.reference->Formatter.referenceBlockStr,
        creditorPostCode: compPostCode(cd.creditorCountryCode, cd.creditorPostCode),
        debtorPostCode: compPostCode(cd.debtorCountryCode, cd.debtorPostCode),
        qrCodeString,
        showQRCode: qrCodeString != "",
        showAmount: cd.amount != "",
        showDebtor: cd.debtorName != "",
        showAdditionalInfo: cd.message != "" || cd.messageCode != "",
        showReference: cd.referenceType == "QRR" || cd.referenceType == "SCOR",
      }
    }
  }
