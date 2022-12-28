import type {Language} from "./Translations";
import {Cause} from "@prpsake/core/types/webapi/Error";

type OptSome<V> = {key: string; value: V};

type Opt<V> =
  | {TAG: 0; _0: OptSome<V>} // User
  | {TAG: 1; _0: OptSome<V>} // Default
  | {TAG: 2; _0: Cause.Structured}; // Error

type Currency = "CHF" | "EUR";
type AddressType = "S";

export type Address = {
  addressType: Opt<AddressType>;
  name: Opt<string>;
  street: Opt<string>;
  houseNumber: Opt<string>;
  postCode: Opt<string>;
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
  creditor: Opt<Address>;
  debtor: Opt<Address>;
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
  creditorStreet: string;
  creditorHouseNumber: string;
  creditorPostCode: string;
  creditorLocality: string;
  creditorCountryCode: string;
  debtorAddressType: AddressType;
  debtorName: string;
  debtorStreet: string;
  debtorHouseNumber: string;
  debtorPostCode: string;
  debtorLocality: string;
  debtorCountryCode: string;
  qrCodeString: string;
  showQRCode: boolean;
  showAmount: boolean;
  showDebtor: boolean;
  showAdditionalInfo: boolean;
  showReference: boolean;
  reduceContent: boolean;
  error: Cause.Structured[];
};

export const initAddressMandatoryDefaults: Address;
export const initAddressOptionalDefaults: Address;
export const initDefaults: Init;
export const compDefaults: Comp;

/**
 * Transform and extend the qr-bill data for the hybrids web component.
 *
 * @param {Init} data - The input data to be transformed.
 * @return {Comp} - The transformed data.
 */
export function comp(data: Init): Comp;
