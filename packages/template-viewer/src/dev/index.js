import {defineWith} from "../index.js";
import * as foo from "./templates/foo.js";
import * as baz from "./templates/baz.js";
import style from "./style.css";

defineWith({
  templates: {foo, baz},
  tagQrBill: true,
  style,
});
