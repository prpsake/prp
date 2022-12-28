import {html, jsonToQrBillModel} from "../../index.js";

export const model = {
  title: "",
  language: "",
  foo: "",
  currency: "CHF",
  iban: "CH1509000000152034087",
};

export const view = ({data}) => html`
  <div>${data.foo}</div>
  <qr-bill data=${jsonToQrBillModel(data)}></qr-bill>
`;
