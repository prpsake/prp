import {QrBillHybridElement, Helpers} from "@prpsake/qr-bill"
import "./style.css"

const myQrBill: QrBillHybridElement = document.querySelector("my-qr-bill")

customElements.define("my-qr-bill", QrBillHybridElement)

fetch("/data/qr-bill-sample.json")
  .then(resp => resp.json())
  .then(json => {
    myQrBill.data = Helpers.compFromJson(json)
  })
  .catch(console.log)
