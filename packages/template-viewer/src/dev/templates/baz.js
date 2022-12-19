import {html, jsonToQrBillModel} from "../../index.js";

export const model = {
  title: "",
  language: "",
  foo: "",
  iban: "CH28938",
};

export const view = ({data}) => html`
  <div>${data.foo}</div>
  <qr-bill data=${jsonToQrBillModel(data)}></qr-bill>
`;
