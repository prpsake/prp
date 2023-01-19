import "./style.css";
import {jsonToQrBillCode} from "@prpsake/qr-bill";

fetch("/data/qr-bill-sample.json")
  .then((resp) => resp.json())
  .then((json) => {
    const {data, svg} = jsonToQrBillCode(json);
    if (data.error.length > 0) {
      data.error.forEach(console.log);
    } else {
      const div = document.querySelector("#qr-bill-code");
      const template = document.createElement("template");
      template.innerHTML = svg;
      div.firstChild.replaceWith(template.content.firstChild);
    }
  })
  .catch(console.log);
