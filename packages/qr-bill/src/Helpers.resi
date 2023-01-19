type qrBillCode = {
  data: Data.comp,
  svg: string
}

let jsonToQrBillModel: Js.Dict.t<Js.Json.t> => Data.comp
let jsonToQrBillCode: Js.Dict.t<Js.Json.t> => qrBillCode
