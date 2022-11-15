import { HybridElement, Helpers } from "@prpsake/qr-bill"
import "./style.css"

const myQrBill: HybridElement = document.createElement("my-qr-bill")

customElements.define("my-qr-bill", HybridElement)

fetch("/data/qr-bill-sample.json")
  .then(resp => resp.json())
  .then(json => {
    myQrBill.data = Helpers.compFromJson(json)
    document.body.appendChild(myQrBill)
  })
  .catch(console.log)
