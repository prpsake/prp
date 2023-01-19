import "./style.css";
import {jsonToQrBillCode} from "@prpsake/qr-bill";

fetch("/data/qr-bill-sample.json")
  .then((resp) => resp.json())
  .then((json) => {
    const {data, svg} = jsonToQrBillCode(json);
    if (data.error.length > 0) {
      console.log(data.error);
    } else {
      const div = document.querySelector("#qr-bill-code");
      const template = document.createElement("template");
      template.innerHTML = svg;
      div.appendChild(template.content.firstChild);
    }
  })
  .catch(console.log);
