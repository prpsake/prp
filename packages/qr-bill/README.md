# @prpsake/qr-bill

> Swiss QR-Bill Web Component

This package contains a swiss qr-bill web component. It is primarily created for use in the @prpsake/template-viewer package, but can also be used standalone.

## Installation

Replace `pnpm` with `npm` or `yarn` as you wish.
```bash
pnpm add @prpsake/qr-bill hybrids
```

## Usage

### Use with [hybrids](https://hybrids.js.org)

```typescript
import { define } from "hybrids"
import { Component } from "@prpsake/qr-bill"

define({
  tag: "my-qr-bill",
  ...Component
})
```

### Use without hybrids

```typescript
import { CompiledComponent } from "@prpsake/qr-bill"

customElements.define("my-qr-bill", CompiledComponent)
```
