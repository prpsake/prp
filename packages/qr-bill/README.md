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

```javascript
// components/my-qr-bill.js
import { define } from "hybrids"
import { Component } from "@prpsake/qr-bill"

export default define({
  tag: "my-qr-bill",
  ...Component
})
```

```javascript
// models/my-qr-bill.js
import { store } from "hybrids"
import { Helpers } from "@prpsake/qr-bill"
export default {
  // ...
  [store.connect]: async id => 
    myApi.get(`/${id}`)
      .then(data => Helpers.modelQR({
        data,
        validate: true,
        format: true
      }))
}
```

```javascript
// my-app.js
import { define, store, html } from "hybrids"
import MyQRBill from "./models/my-qr-bill.js"
import "./components/my-qr-bill.js"

define({
  tag: "my-app",
  data: store(MyQRBill),
  render: ({ data }) => html`
    ${store.ready(data) && html`
      <my-qr-bill data=${data}></my-qr-bill>
    `}  
  `
})
```

### Example usage without hybrids

```typescript
import { CompiledComponent, Data, Helpers } from "@prpsake/qr-bill"

customElements.define("my-qr-bill", CompiledComponent)

const qrBill: CompiledComponent = document.createElement("qr-bill")

myApi.get(`/${id}`).then((data: Data.QrBillInit) => {
    qrBill.data = Helpers.modelQR({
      data,
      validate: true,
      format: true
    })
    document.body.appendChild(qrBill)
  })
```

## Model

```typescript 
{
  lang?: "fr" | "it" | "de" | "en"
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
