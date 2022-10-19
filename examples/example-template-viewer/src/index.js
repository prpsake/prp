import { defineWith } from "@prpsake/template-viewer";

import * as estimate from "./templates/estimate.js"
import * as invoice from "./templates/invoice.js"
import styles from "./index.css"


defineWith({
  tag: "the-app",
  tagQR: "a-qr-bill",
  previewSelector: "#preview",
  templates: { estimate, invoice },
  styles
})
