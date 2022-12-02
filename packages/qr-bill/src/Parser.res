let dictGet: Js.Dict.t<Js.Json.t> => string => Data.opt<'a> =
  d =>
  key =>
  switch Js.Dict.get(d, key) {
  | Some(val) => Data.User({ key, val })
  | None => Data.None
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
  | Data.User({ key, val }) =>
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
  reference =>
  iban =>
  switch reference {
  | Data.None => Data.initDefaults.referenceType
  | _ =>
    switch iban {
    | Data.User({ val }) =>
      Formatter.removeWhitespace(val)
      ->Js.String2.substring(~from=4, ~to_=5)
      ->x => (x == "3" ? "QRR" : "SCOR")
      ->x => Data.User({ key: "referenceType", val: x })
    | _ => Data.initDefaults.referenceType
    }
  }

let chooseAddressType =
  maybeAddressType =>
  postalCode =>
  switch maybeAddressType {
  | Data.None =>
    Data.User({
      key: "addressType",
      val: (postalCode === Data.None ? "K" : "S")
    })
  | t => t
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
      let iban = dataGet("iban")->parseString(Data.initDefaults.iban)
      let reference = dataGet("reference")->parseString(Data.initDefaults.reference)
      {
        language: dataGet("language")->parseString(Data.initDefaults.language),
        currency: dataGet("currency")->parseString(Data.initDefaults.currency),
        amount: dataGet("amount")->parseFloatString(Data.initDefaults.amount),
        iban,
        referenceType: chooseReferenceType(reference, iban),
        reference,
        message: dataGet("message")->parseString(Data.initDefaults.message),
        messageCode: dataGet("messageCode")->parseString(Data.initDefaults.messageCode),
        creditor:
          switch Js.Dict.get(d, "creditor") {
          | Some(x) =>
            switch Js.Json.classify(x) {
            | JSONObject(ad) =>
              let addressDataGet = dictGet(ad)
              let postalCode = addressDataGet("postalCode")->parseString(Data.None)
              Data.User({
                key: "creditor",
                val: {
                  addressType:
                    addressDataGet("addressType")
                    ->parseString(Data.None)
                    ->chooseAddressType(postalCode),
                  name: addressDataGet("name")->parseString(Data.None),
                  street: addressDataGet("street")->parseString(Data.None),
                  streetNumber: addressDataGet("streetNumber")->parseString(Data.None),
                  postOfficeBox: addressDataGet("postOfficeBox")->parseString(Data.None),
                  postalCode,
                  locality: addressDataGet("locality")->parseString(Data.None),
                  countryCode: addressDataGet("countryCode")->parseString(Data.None)
                }
              })
            | _ => Data.initDefaults.creditor
            }
          | None => Data.initDefaults.creditor
          },
        debtor:
          switch Js.Dict.get(d, "debtor") {
          | Some(x) =>
            switch Js.Json.classify(x) {
            | JSONObject(ad) =>
              let addressDataGet = dictGet(ad)
              let postalCode = addressDataGet("postalCode")->parseString(Data.None)
              Data.User({
                key: "debtor",
                val: {
                  addressType:
                    addressDataGet("addressType")
                    ->parseString(Data.None)
                    ->chooseAddressType(postalCode),
                  name: addressDataGet("name")->parseString(Data.None),
                  street: addressDataGet("street")->parseString(Data.None),
                  streetNumber: addressDataGet("streetNumber")->parseString(Data.None),
                  postOfficeBox: addressDataGet("postOfficeBox")->parseString(Data.None),
                  postalCode,
                  locality: addressDataGet("locality")->parseString(Data.None),
                  countryCode: addressDataGet("countryCode")->parseString(Data.None)
                }
              })
            | _ => Data.initDefaults.debtor
            }
          | None => Data.initDefaults.debtor
          },
      }
    | _ => Data.initDefaults //failwith("Expected an object")
    }
  } catch {
  | _ => Data.initDefaults
  }
