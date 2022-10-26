import { defineWith } from "@prpsake/template-viewer";
import * as estimate from "./templates/estimate"
import * as invoice from "./templates/invoice"
import styles from "./index.css"


defineWith({
  templates: { estimate, invoice },
  styles,
})
