import {QrBill, QrBillModel, jsonToQrBillModel} from "@prpsake/qr-bill";
import {type Model, define, store, html} from "hybrids";
import "./style.css";

const MyQrBillModel: Model<QrBillModel> = {
  ...QrBillModel,
  [store.connect]: () =>
    fetch("/data/qr-bill-sample.json")
      .then((resp) => resp.json())
      .then(jsonToQrBillModel)
      .catch(console.log),
};

define<QrBill>({
  tag: "my-qr-bill",
  data: store(MyQrBillModel),
  render: ({data}) => html` ${store.ready(data) && QrBill.render(data)} `,
});
