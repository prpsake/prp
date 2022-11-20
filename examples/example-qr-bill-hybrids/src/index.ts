import QrBill, {QrBillModel, Helpers} from "@prpsake/qr-bill"
import {type Model, define, store} from "hybrids"
import "./style.css"


const MyQrBillModel: Model<QrBillModel> = {
  ...QrBillModel,
  [store.connect]: () =>
    fetch("/data/qr-bill-sample.json")
      .then(resp => resp.json())
      .then(Helpers.compFromJson)
      .catch(console.log)
}

define({
  ...QrBill,
  tag: "my-qr-bill",
  data: {
    value: undefined,
    connect: host => {
      store
      .resolve(MyQrBillModel)
      .then(data => {
        Object.entries(data).map(([key, value]) => {
          host[key] = value
        })
      })
    }
  }
})
