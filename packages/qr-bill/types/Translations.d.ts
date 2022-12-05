export type Language = "fr" | "it" | "de" | "en";

export type Translation = {
  paymentPartTitle: string;
  creditorHeading: string;
  referenceHeading: string;
  additionalInfoHeading: string;
  furtherInfoHeading: string;
  currencyHeading: string;
  amountHeading: string;
  receiptTitle: string;
  acceptancePointHeading: string;
  separateText: string;
  debtorHeading: string;
  debtorFieldHeading: string;
  ultimateCreditorHeading: string;
};

export type Translations = {[key in Language]: Translation};

export const translations: Translations;
