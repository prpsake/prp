# @prpsake/qr-bill

> Swiss QR-Bill Web Component

This package contains a swiss qr-bill web component. It is primarily created for use in the @prpsake/template-viewer package, but can also be used standalone.

## Installation

Replace `pnpm` with `npm` or `yarn` as you wish.
```bash
pnpm add @prpsake/qr-bill hybrids
```

## Usage

### Example usage with [hybrids](https://hybrids.js.org)

```typescript
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
```

### Example usage without hybrids

```typescript
import { HybridElement, Helpers } from "@prpsake/qr-bill"
import "./style.css"

const myQrBill: HybridElement = document.createElement("my-qr-bill")

customElements.define("my-qr-bill", HybridElement)

fetch("/data/qr-bill-sample.json")
  .then(resp => resp.json())
  .then(json => {
    myQrBill.data = Helpers.compFromJson(json)
    document.body.appendChild(myQrBill)
  })
  .catch(console.log)
```

## Model

```typescript 
{
  language?: "fr" | "it" | "de" | "en" // default: "en"
  currency: "CHF" | "EUR"
  amount?: string
  iban: string
  reference?: string
  message?: string
  messageCode?: string
  creditor: {
    name: string
    street?: string
    streetNumber?: string | number
    postOfficeBox?: string | number
    postalCode: string | number
    locality: string
    countryCode: string
  },
  debtor?: {
    name: string
    street?: string
    streetNumber?: string | number
    postOfficeBox?: string | number
    postalCode: string | number
    locality: string
    countryCode: string
  }
}
```
