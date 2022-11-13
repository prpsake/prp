import QrBill, { Parser, Validator, Data } from "@prpsake/qr-bill"
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
    .then(json =>
      [Parser.parse(json)]
      .map(Validator.validate)
      .map(Data.comp)
      [0]
    )
    .catch(console.log)
}

define({ ...QrBill, tag: "my-qr-bill" })

define<MyApp>({
  tag: "my-app",
  qrBill: store(QrBillModel),
  content: ({ qrBill }) => html`
    ${store.ready(qrBill) && html`
      <my-qr-bill data=${qrBill}></my-qr-bill>
    `}
  `
})
