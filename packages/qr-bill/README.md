# @prpsake/qr-bill

> Swiss QR-Bill Web Component

This package contains a swiss qr-bill web component. Intended primarily for the @prpsake/template-viewer package, it can also be used independently.

![@prpsake-example-qr-bill-1](https://user-images.githubusercontent.com/22403007/202928330-53dbb68a-443c-4f1e-8fd8-593315cab572.png)

## Installation

Replace `pnpm` with `npm` or `yarn` as you wish.
The `@prpsake/qr-bill` package needs [`hybrids`](https://hybrids.js.org), even if you don't use hybrids directly.
```bash
pnpm add @prpsake/qr-bill hybrids
```

## Usage

### Sample data
```json5
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
    "houseNumber": "9",
    "postCode": "9000",
    "locality": "Da",
    "countryCode": "CH"
  },
  "debtor": {
    "name": "Eine Org",
    "street": "Geleepistole",
    "houseNumber": "1",
    "postCode": "1000",
    "locality": "Dort",
    "countryCode": "CH"
  }
}
```

### Example with [hybrids](https://hybrids.js.org)
You can find the full example in the [examples/example-qr-bill-hybrids](https://github.com/prpsake/prp/tree/main/examples/example-qr-bill-hybrids) folder of this repo.

```typescript
import {QrBill, QrBillModel, jsonToQrBillModel} from "@prpsake/qr-bill";
import {type Model, define, store, html} from "hybrids";
import "./style.css";

interface MyApp {
  qrBillData: QrBillModel;
}

const MyQrBillModel: Model<QrBillModel> = {
  ...QrBillModel,
  [store.connect]: () =>
    fetch("/data/qr-bill-sample.json")
      .then((resp) => resp.json())
      .then(jsonToQrBillModel)
      .catch(console.log),
};

define(QrBill);
define<MyApp>({
  tag: "my-app",
  qrBillData: store(MyQrBillModel),
  content: ({qrBillData}) => html`
    ${store.ready(qrBillData) && html`
      <qr-bill
        data=${qrBillData}
        onerror=${handleQrBillError}>
      </qr-bill>
    `}
  `,
});

function handleQrBillError(_host, {detail}) {
  detail.forEach(({key, msg}) => console.log(key, ":", msg));
}
```

```html
<my-app></my-app>
```

The imported stylesheet (`import "./style.css"`) is not part of the package. It is shown here to refer to the additional styles used in the full example mentioned above. it contains a few reset, component positioning, page and print styles, respectively some screen-only-styles. See [here](https://github.com/prpsake/prp/blob/main/examples/example-qr-bill-hybrids/src/style.css).

### Example without hybrids

```typescript
import {QrBillHybridElement, jsonToQrBillModel} from "@prpsake/qr-bill";
import "./style.css";

customElements.define("my-qr-bill", QrBillHybridElement);

const myQrBill: QrBillHybridElement = document.querySelector("my-qr-bill");

myQrBill.addEventListener("error", ({detail}) => {
  detail.forEach(({key, msg}) => console.log(key, ":", msg));
});

fetch("/data/qr-bill-sample.json")
  .then((resp) => resp.json())
  .then((json) => {
    myQrBill.data = jsonToQrBillModel(json);
  })
  .catch(console.log);
```

```html
<my-qr-bill></my-qr-bill>
```

## Model

```typescript
type Address = {
  name: string;
  street?: string;
  houseNumber?: string | number;
  postalCode: string | number;
  locality: string;
  countryCode: string
}

type Init = {
  language: "fr" | "it" | "de" | "en"
  currency: "CHF" | "EUR"
  amount: string | number
  iban: string
  reference?: string
  message?: string
  messageCode?: string
  creditor: Address
  debtor?: Address
}
```
