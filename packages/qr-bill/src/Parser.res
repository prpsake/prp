let dictGet: Js.Dict.t<Js.Json.t> => string => Data.opt<'a> =
  d =>
  key =>
  switch Js.Dict.get(d, key) {
  | Some(val) => Data.User({key, val})
  | None => Data.Default({key, val: Js.Json.null})
  }

let parseString: Data.opt<Js.Json.t> => Data.opt<string> => Data.opt<string> =
  o =>
  dfo =>
  switch o {
  | Data.User({ key, val }) =>
    switch Js.Json.classify(val) {
    | JSONString(s) =>
      switch Js.String.trim(s) {
      | "" => dfo
      | _ => Data.User({ key, val: s })
      }
    | JSONNumber(n) => Data.User({ key, val: Js.Float.toString(n) })
    | _ => dfo
    }
  | _ => dfo
  }

let parseFloatString: Data.opt<Js.Json.t> => Data.opt<string> => Data.opt<string> =
  o =>
  dfo =>
  switch o {
  | Data.User({key, val}) =>
    switch Js.Json.classify(val) {
    | JSONString(s) =>
      switch Js.String.trim(s) {
      | "" => dfo
      | _ =>
        Js.Float.fromString(s)
        ->n => Js.Float.isNaN(n) ? dfo : Data.User({ key, val: s })
      }
    | JSONNumber(n) => Data.User({ key, val: Js.Float.toString(n) })
    | _ => dfo
    }
  | _ => dfo
  }

let chooseReferenceType =
  referenceType =>
  reference =>
  iban =>
  switch referenceType {
  | Data.Default(_) =>
    switch reference {
    | Data.Default(_) => referenceType
    | _ =>
      switch iban {
      | Data.User({key, val}) =>
        Formatter.removeWhitespace(val)
        ->Js.String2.substring(~from=4, ~to_=5)
        ->x => (x == "3" ? "QRR" : "SCOR")
        ->x => Data.User({key, val: x})
      | _ => referenceType
      }
    }
  | _ => referenceType
  }

let parseAddress: Data.opt<Js.Json.t> => Data.opt<Data.address> => Data.opt<Data.address> =
  o =>
  dfo =>
  switch o {
  | Data.User({key, val}) =>
    switch Js.Json.classify(val) {
    | JSONObject(d) =>
      let dataGet = dictGet(d)
      let defaults = Data.initMandatoryAddressDefaults
      Data.User({
        key,
        val: {
          addressType: defaults.addressType,
          name: dataGet("name")->parseString(defaults.name),
          street: dataGet("street")->parseString(defaults.street),
          houseNumber: dataGet("houseNumber")->parseString(defaults.houseNumber),
          postCode: dataGet("postCode")->parseString(defaults.postCode),
          locality: dataGet("locality")->parseString(defaults.locality),
          countryCode: dataGet("countryCode")->parseString(defaults.countryCode)
        }
      })
    | _ => dfo
    }
  | _ => dfo
  }

let parse: Js.Dict.t<Js.Json.t> => Data.init =
  str =>
  try {
    let json =
      switch Js.Json.stringifyAny(str) {
      | Some(x) => x
      | None => ""
      }
      ->Js.Json.parseExn
    switch Js.Json.classify(json) {
    | JSONObject(d) =>
      let dataGet = dictGet(d)
      let defaults = Data.initDefaults
      let iban = dataGet("iban")->parseString(defaults.iban)
      let reference = dataGet("reference")->parseString(defaults.reference)
      {
        language: dataGet("language")->parseString(defaults.language),
        currency: dataGet("currency")->parseString(defaults.currency),
        amount: dataGet("amount")->parseFloatString(defaults.amount),
        iban,
        referenceType:
          dataGet("referenceType")
          ->parseString(defaults.referenceType)
          ->chooseReferenceType(reference, iban),
        reference,
        message: dataGet("message")->parseString(defaults.message),
        messageCode: dataGet("messageCode")->parseString(defaults.messageCode),
        creditor: dataGet("creditor")->parseAddress(defaults.creditor),
        debtor: dataGet("debtor")->parseAddress(defaults.debtor),
      }
    | _ => Data.initDefaults //failwith("Expected an object")
    }
  } catch {
  | _ => Data.initDefaults
  }
