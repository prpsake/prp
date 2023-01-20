import fs from "fs";
import {jsonToQrBillCode} from "@prpsake/qr-bill";

const json = fs.readFileSync("public/data/qr-bill-sample.json", {
  encoding: "utf8",
});

const {data, svg} = jsonToQrBillCode(json);

if (data.error.length > 0) {
  console.log(data.error);
} else {
  fs.writeFileSync("public/svg/XYZ123.svg", svg, {encoding: "utf8"});
}
