type optSome<'a> = {key: string, value: 'a}

type opt<'a> =
  | User(optSome<'a>)
  | Default(optSome<'a>)
  | Error(PrpsakeCore.Error.Cause.structured)

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
  error: array<PrpsakeCore.Error.Cause.structured>
}

let foldString: opt<string> => string
let foldAddress: (. opt<address>, address) => address
let initMandatoryAddressDefaults: address
let initOptionalAddressDefaults: address
let initDefaults: init
let compDefaults: comp
let comp: init => comp
