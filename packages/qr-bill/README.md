# @prpsake/qr-bill

> Swiss QR-Bill Web Component

This package contains a swiss qr-bill web component. It is primarily created for use in the @prpsake/template-viewer package, but can also be used standalone.

![](../../../../../Desktop/@prpsake-example-qr-bill-1.png)

## Installation

Replace `pnpm` with `npm` or `yarn` as you wish.
```bash
pnpm add @prpsake/qr-bill hybrids
```

## Usage

### Sample data
```typescript 
// qr-bill-sample.json

{
  "language": "it",
  "currency": "CHF",
  "amount": "2880.00",
  "iban": "CH1509000000152034087",
  "message": "Rechnung 00123",
  "creditor": {
    "name": "Andere Org",
    "street": "Hustensaft",
    "streetNumber": "9",
    "postalCode": "9000",
    "locality": "Da",
    "countryCode": "CH"
  },
  "debtor": {
    "name": "Eine Org",
    "street": "Geleepistole",
    "streetNumber": "1",
    "postalCode": "1000",
    "locality": "Dort",
    "countryCode": "CH"
  }
}

```

### Example with [hybrids](https://hybrids.js.org)

```typescript
import {QrBill, QrBillModel, Helpers} from "@prpsake/qr-bill"
import {type Model, define, store, html} from "hybrids"
import "./style.css"


const MyQrBillModel: Model<QrBillModel> = {
  ...QrBillModel,
  [store.connect]: () =>
    fetch("/data/qr-bill-sample.json")
      .then(resp => resp.json())
      .then(Helpers.compFromJson)
      .catch(console.log)
}

define<QrBill>({
  tag: "my-qr-bill",
  data: store(MyQrBillModel),
  render: ({ data }) => html`
    ${store.ready(data) && QrBill.render(data)}
  `
})
```

```html
<my-qr-bill></my-qr-bill>
```

### Example without hybrids

```typescript
import { QrBillHybridElement, Helpers } from "@prpsake/qr-bill"
import "./style.css"

const myQrBill: QrBillHybridElement = document.createElement("my-qr-bill")

customElements.define("my-qr-bill", QrBillHybridElement)

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
  language: "fr" | "it" | "de" | "en"
  currency: "CHF" | "EUR"
  amount: string
  iban: string
  reference: string
  message: string
  messageCode: string
  creditor: {
    name: string
    street: string
    streetNumber: string | number
    postOfficeBox: string | number
    postalCode: string | number
    locality: string
    countryCode: string
  },
  debtor: {
    name: string
    street: string
    streetNumber: string | number
    postOfficeBox: string | number
    postalCode: string | number
    locality: string
    countryCode: string
  }
}
```
