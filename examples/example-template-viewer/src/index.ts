import {defineWith} from "@prpsake/template-viewer";
import * as estimate from "./templates/estimate";
import * as invoice from "./templates/invoice";
import style from "./style.css";

defineWith({
  templates: {estimate, invoice},
  tagQrBill: true,
  style,
});
