import {html, jsonToQrBillModel} from "../../index.js";

export const model = {
  title: "",
  language: "",
  foo: "",
};

export const view = ({data}) => html`
  <div>${data.foo}</div>
  <qr-bill onerror=${handleQrBillError}></qr-bill>
`;

function handleQrBillError(host, {detail}) {
  console.log(detail);
}
