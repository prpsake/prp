import "./style.css"
import {define} from "hybrids"
import {Helpers, Component} from "@prpsake/qr-bill"


const qrBill = define.compile(Component)
customElements.define("qr-bill", qrBill)

const el: Component = document.querySelector("qr-bill")
el.data = Helpers.modelQR({
  data: {
    lang: "fr",
    currency: "CHF",
    iban: "CH1509000000152034087",
    amount: "18",
    creditor: {
      name: "Daphne Kräcker",
      street: "Rue",
      streetNumber: "1",
      locality: "Lausanne",
      postalCode: "1000",
      countryCode: "CH"
    }
  },
  validate: true,
  format: true
})

