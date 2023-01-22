import {promises as fsp} from "fs";
import {jsonToQrBillCode} from "@prpsake/qr-bill";

fsp
  .readFile("public/data/qr-bill-sample.json", {encoding: "utf8"})
  .then((json) => {
    const {data, svg} = jsonToQrBillCode(json);
    data.error.length > 0
      ? data.error
      : fsp.writeFile("public/svg/XYZ123.svg", svg, {encoding: "utf8"});
  })
  .then((error) => console.log(error || "success"))
  .catch(console.log);
