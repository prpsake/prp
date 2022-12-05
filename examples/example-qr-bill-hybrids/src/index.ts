import {QrBill, QrBillModel, jsonToQrBillModel} from "@prpsake/qr-bill";
import {type Model, define, store, html} from "hybrids";
import "./style.css";

interface MyApp {
  qrBillData: QrBillModel;
}

const MyQrBillModel: Model<QrBillModel> = {
  ...QrBillModel,
  [store.connect]: () =>
    fetch("/data/qr-bill-sample.json")
      .then((resp) => resp.json())
      .then(jsonToQrBillModel)
      .catch(console.log),
};

define(QrBill);
define<MyApp>({
  tag: "my-app",
  qrBillData: store(MyQrBillModel),
  content: ({qrBillData}) => html`
    ${store.ready(qrBillData) &&
    html`
      <qr-bill
        data=${qrBillData}
        onerror=${handleQrBillError}>
      </qr-bill>
    `}
  `,
});

function handleQrBillError(_host, {detail}) {
  detail.forEach(({key, msg}) => console.log(key, ":", msg));
}
