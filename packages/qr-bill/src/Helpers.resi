type qrBillCode = {
  data: Data.comp,
  svg: string
}

let jsonToQrBillModel: Js.Json.t => Data.comp
let jsonToQrBillCode: Js.Json.t => qrBillCode
