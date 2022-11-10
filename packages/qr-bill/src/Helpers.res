//import * as Parser from "./Parser.mjs"
//import * as Validator from "./Validator.mjs"
//import * as Data from "./Data.mjs"
//import * as Formatter from "./Formatter.mjs"
//import { Obj } from "@prpsake/utils"
//
//
//
//const isTrueish =
//  x =>
//  typeof x === 'number' || x
//
//
//
//const showWith =
//  (host, otherKeys) =>
//  Obj.isObject(otherKeys) ?
//  Object.entries(otherKeys).map(
//    ([k, vs]) =>
//    Array.isArray(vs) ?
//    vs.some(v => v === host[k]) :
//    false
//  ).some(isTrueish) :
//  false
//
//
//
//const notShowWith =
//  (host, otherKeys) =>
//  Obj.isObject(otherKeys) ?
//  Object.entries(otherKeys).map(
//    ([k, vs]) =>
//    Array.isArray(vs) ?
//    vs.every(v => v !== host[k]) :
//    true
//  ).some(isTrueish) :
//  true
//
//
//
//// const fn = f => ({ set: (_, value) => f(value) })
////
//
//
//const modelQR = ({ data, validate = true, format = true }) => {
//  const data_ = [data]
//    .map(Parser.parseJson)
//    .map(x => validate ? Validator.validate(x) : x)
//    .map(Data.object)
//    [0]
//
//  return {
//    ...data_,
//    amount: format ? Formatter.moneyFromNumberStr2(data_.amount) : data_.amount,
//    iban: format ? Formatter.blockStr4(data_.iban) : data_.iban,
//    reference: format ? Formatter.referenceBlockStr(data_.reference) : data_.reference,
//    reduceContent: false,
//    showQRCode: notShowWith(data_, { qrCodeString: [""] }),
//    showAmount: notShowWith(data_, { amount: [""] }),
//    showReference: showWith(data_, { referenceType: ["QRR", "SCOR"] }),
//    showDebtor: notShowWith(data_, { debtorName: [""], debtorAddressLine1: [""], debtorAddressLine2: [""] }),
//    showAdditionalInfo: notShowWith(data_, { message: [""], messageCode: [""] })
//  }
//}
//
//
//export { showWith, notShowWith, modelQR }
