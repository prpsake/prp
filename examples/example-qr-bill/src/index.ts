import {QrBillHybridElement, jsonToQrBillModel} from "@prpsake/qr-bill";
import "./style.css";

customElements.define("my-qr-bill", QrBillHybridElement);

const myQrBill: QrBillHybridElement = document.querySelector("my-qr-bill");

myQrBill.addEventListener("error", ({detail}) => {
  detail.forEach(({key, msg}) => console.log(key, ":", msg));
});

fetch("/data/qr-bill-sample.json")
  .then((resp) => resp.json())
  .then((json) => {
    myQrBill.data = jsonToQrBillModel(json);
  })
  .catch(console.log);
