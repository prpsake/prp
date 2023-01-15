# @prpsake/template-viewer

> PRP Template Viewer Web Component

This package contains a web component to populate prp document templates with data, preview and print them from the browser. It is used to create said templates for a private productivity application, but can also be used standalone.

## Installation

Replace `pnpm` with `npm` or `yarn` as you wish.

```bash
pnpm add @prpsake/template-viewer
```

## Usage

### Example

```typescript
import {defineWith} from "@prpsake/template-viewer";
import * as estimate from "./templates/estimate";
import * as invoice from "./templates/invoice";
import style from "./style.css";

defineWith({
  templates: {estimate, invoice},
  tagQrBill: true,
  api: {
    idKey: "id",
    get: ({id}) =>
      fetch(`http://localhost:3001/billable/${id}`)
        .then((resp) => resp.json())
        .catch(console.log),
    list: () =>
      fetch(`http://localhost:3001/billable`)
        .then((resp) => resp.json())
        .catch(console.log),
  },
  onError: ({error}) => error.forEach(console.log),
  style,
});
```

You can find the full example in the [examples/example-template-viewer](https://github.com/prpsake/prp/tree/main/examples/example-template-viewer) folder of this repo.
