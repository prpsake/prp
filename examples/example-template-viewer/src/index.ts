import {defineWith} from "@prpsake/template-viewer";
import * as estimate from "./templates/estimate";
import * as invoice from "./templates/invoice";
import style from "./style.css?inline";

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
  onError: ({error}) => console.log(error),
  style,
});
