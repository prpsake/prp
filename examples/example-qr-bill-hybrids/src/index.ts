import QrBill, { Data, Helpers } from "@prpsake/qr-bill"
import { Model, define, store, html } from "hybrids"
import "./style.css"

interface MyApp {
  qrBill: QrBill
}

const QrBillModel: Model<QrBill> = {
  ...Data.compDefaults,
  [store.connect]: () =>
    fetch("/data/qr-bill-sample.json")
    .then(resp => resp.json())
    .then(Helpers.compFromJson)
    .catch(console.log)
}

define({
  ...QrBill,
  tag: "my-qr-bill"
})

define<MyApp>({
  tag: "my-app",
  qrBill: store(QrBillModel),
  content: ({ qrBill }) => html`
    ${store.ready(qrBill) && html`
      <my-qr-bill data=${qrBill}></my-qr-bill>
    `}
  `
})
