declare module "@prpsake/qr-bill"
declare module "*.css" {
  const style: string
  export default style
}

export * as QrBill from "../src/QrBill"
export * as Parser from "./Parser"
export * as Validator from "./Validator"
export * as Formatter from "./Formatter"
export * as Data from "./Data"
export * as QRCode from "./QRCode"


