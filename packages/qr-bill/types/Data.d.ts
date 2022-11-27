type OptSome<V> = {key: string; val: V};

type OptErr<V> = {
  type: string;
  key: string;
  val: V;
  msg: string;
};

type Opt<V> =
  | {TAG: 0; _0: OptSome<V>} // User
  | {TAG: 1; _0: OptSome<V>} // Default
  | {TAG: 2; _0: OptErr<V>} // Error
  | 0; // None

type Language = "fr" | "it" | "de" | "en";
type Currency = "CHF" | "EUR";

// NB(28.10.22): By swiss-qr-bill-spec `addressType` can also be "S" (structured address items) but only "K" (combined
// address items) are handled at the moment. See Parser.res and Validator.res.
type AddressType = "K"; // | "S"

export type InitAddress = {
  addressType: Opt<AddressType>;
  name: Opt<string>;
  street: Opt<string>;
  streetNumber: Opt<string>;
  postOfficeBox: Opt<string>;
  postalCode: Opt<string>;
  locality: Opt<string>;
  countryCode: Opt<string>;
};

export type Init = {
  language: Opt<Language>;
  currency: Opt<Currency>;
  amount: Opt<string>;
  iban: Opt<string>;
  referenceType: Opt<string>;
  reference: Opt<string>;
  message: Opt<string>;
  messageCode: Opt<string>;
  creditor: Opt<InitAddress>;
  debtor: Opt<InitAddress>;
};

export type Comp = {
  language: Language;
  currency: Currency;
  amount: string;
  iban: string;
  referenceType: string;
  reference: string;
  message: string;
  messageCode: string;
  creditorAddressType: AddressType;
  creditorName: string;
  creditorCountryCode: string;
  creditorAddressLine1: string;
  creditorAddressLine2: string;
  debtorAddressType: AddressType;
  debtorName: string;
  debtorAddressLine1: string;
  debtorAddressLine2: string;
  debtorCountryCode: string;
  qrCodeString: string;
  showQRCode: boolean;
  showAmount: boolean;
  showDebtor: boolean;
  showAdditionalInfo: boolean;
  showReference: boolean;
  reduceContent: boolean;
};

export const initAddressDefaults: InitAddress;
export const initDefaults: Init;
export const compDefaults: Comp;

/**
 * Transform and extend the qr-bill data for the hybrids web component.
 *
 * @param {Init} data - The input data to be transformed.
 * @return {Comp} - The transformed data.
 */
export function comp(data: Init): Comp;
