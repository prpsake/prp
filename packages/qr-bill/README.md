# @prpsake/qr-bill

> Swiss QR-Bill Web Component

This package contains a swiss qr-bill web component. It is primarily created for use in the @prpsake/template-viewer package, but can also be used standalone.

## Installation

Replace `pnpm` with `npm` or `yarn` as you wish.
```bash
pnpm add @prpsake/qr-bill hybrids
```

## Usage

### Define the element

#### Either as [hybrids](https://hybrids.js.org) custom element...

```typescript
import { define } from "hybrids"
import { Element } from "@prpsake/qr-bill"

define({
  tag: "my-qr-bill",
  ...Element
})
```

#### ... Or as normal custom element

```typescript
import { define } from "hybrids"
import { Element } from "@prpsake/qr-bill"

const myQRBill = define.compile(Element)

customElements.define("my-qr-bill", myQRBill)

```

### Use the element

```typescript jsx
import {QRBillInit} from "@prpsake/qr-bill/types/Data"

export default {
  someRenderFn: (data: QRBillInit) => `
    <my-qr-bill data=${data}></my-qr-bill>
  `
}
```


