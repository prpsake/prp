import { Component, Data, Parser, Validator } from "@prpsake/qr-bill"
import { Model, define, store, html } from "hybrids"
import "./style.css"

interface MyApp {
  qrBill: Data.QrBillComponent
}

const QrBill: Model<Data.QrBillComponent> = {
  lang: "de",
  currency: "CHF",
  amount: "",
  iban: "",
  referenceType: "",
  reference: "",
  message: "",
  messageCode: "",
  creditorAddressType: "",
  creditorName: "",
  creditorAddressLine1: "",
  creditorAddressLine2: "",
  creditorCountryCode: "",
  debtorAddressType: "",
  debtorName: "",
  debtorAddressLine1: "",
  debtorAddressLine2: "",
  debtorCountryCode: "",
  qrCodeString: "",
  showQRCode: false,
  showAmount: false,
  showDebtor: false,
  showAdditionalInfo: false,
  showReference: false,
  reduceContent: false,
  [store.connect]: () =>
    fetch("/data/qr-bill-sample.json")
    .then(resp => resp.json())
    .then(json => {
      const parsedData = Parser.parseJson(json)
      const validatedData = Validator.validate(parsedData)
      return Data.component(validatedData)
    }).catch(console.log)
}

define<Data.QrBillComponent>({
  tag: "my-qr-bill",
  ...Component.object
})

define<MyApp>({
  tag: "my-app",
  qrBill: store(QrBill),
  content: ({ qrBill }) => html`
    ${store.ready(qrBill) && html`
      <my-qr-bill data=${qrBill}></my-qr-bill>
    `}
  `
})
