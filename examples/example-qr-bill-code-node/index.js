import fs from "fs";
import {jsonToQrBillCode} from "@prpsake/qr-bill";

const json = fs.readFileSync("public/data/qr-bill-sample.json", {
  encoding: "utf8",
});
const data = JSON.parse(json);
const code = jsonToQrBillCode(data);

if (code.data.error.length > 0) {
  console.log(code.data.error);
} else {
  fs.writeFileSync("public/svg/XYZ123.svg", code.svg, {encoding: "utf8"});
}
