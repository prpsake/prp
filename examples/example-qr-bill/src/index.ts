import "./style.css"
import {CompiledComponent, Helpers, Data} from "@prpsake/qr-bill"


customElements.define("qr-bill", CompiledComponent)


const qrBill: CompiledComponent = document.createElement("qr-bill")


fetch("/data/qr-bill-sample.json")
  .then(json => json.json())
  .then((data: Data.QRBillInit) => {
    qrBill.data = Helpers.modelQR({
      data,
      validate: true,
      format: true
    })
    document.body.appendChild(qrBill)
  })
