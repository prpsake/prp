type qrBillCode = {
  data: Data.comp,
  svg: string
}

let jsonToQrBillModel: Js.Dict.t<Js.Json.t> => Data.comp =
  x =>
  Parser.parse(x)
  ->Validator.validate
  ->Data.comp

let jsonToQrBillCode: Js.Dict.t<Js.Json.t> => qrBillCode =
  x =>
  jsonToQrBillModel(x)
  ->data => {
    data: data,
    svg: switch Js.Array2.length(data.error) {
    | 0 =>
      QRCode.pathDataFromString(data.qrCodeString,{
        ecl: #M,
        width: 570,
        height: 570,
        padding: 0
      })
      ->matrix =>
        `<svg width="100%" height="100%" viewBox="0 0 570 570" fill="#000"><path shape-rendering="crispEdges" d="${matrix}"/><rect x="245" y="245" width="80" height="80"/><path fill="#fff" fill-rule="evenodd" shape-rendering="crispEdges" d="M328.37,241.63L241.63,241.63L241.63,328.37L328.37,328.37L328.37,241.63ZM325.069,244.931L244.931,244.931L244.931,325.069L325.069,325.069L325.069,244.931ZM293.014,275.572L293.014,257.187L277.458,257.187L277.458,275.572L259.073,275.572L259.073,291.128L277.458,291.128L277.458,309.041L293.014,309.041L293.014,291.128L310.927,291.128L310.927,275.572L293.014,275.572Z"/></svg>`
    | _ => ""
    }
  }
