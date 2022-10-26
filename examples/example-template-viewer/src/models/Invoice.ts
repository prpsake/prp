import {Model} from "@prpsake/template-viewer";
import Party from "./Party";


interface Invoice {
  title: string
  number: string
  subject: string
  date: string
  due: string
  lang: string
  currency: string
  amount: string
  reference: string
  message: string
  messageCode: string
  creditor: Model<Party>
  debtor: Model<Party>
  note: string
  items: Array<{
    quantity: string
    unit: string
    price: string
    total: string
    title: string
    description: string
    issues: Array<string>
  }>
  emailSubject: string
  qr?: {}
}


const Invoice: Model<Invoice> = {
  title: "",
  number: "",
  subject: "",
  date: "",
  due: "",
  lang: "",
  currency: "",
  amount: "",
  reference: "",
  message: "",
  messageCode: "",
  creditor: Party,
  debtor: Party,
  note: "",
  items: [{
    quantity: "",
    unit: "",
    price: "",
    total: "",
    title: "",
    description: "",
    issues: [""]
  }],
  emailSubject: ({ title, number, subject }) => encodeURIComponent(`${title} ${number} | ${subject}`)
}


export default Invoice
