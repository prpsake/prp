let mod97FromString: string => int = str => {
  let remainder = ref(str)
  let block = ref("")

  while Js.String.length(remainder.contents) > 2 {
    block := Js.String2.slice(remainder.contents, ~from=0, ~to_=9)
    remainder :=
      switch Belt.Int.fromString(block.contents) {
      | Some(x) =>
        Belt.Int.toString(mod(x, 97)) ++
        Js.String2.sliceToEnd(remainder.contents, ~from=Js.String.length(block.contents))
      | None => ""
      }
  }

  switch Belt.Int.fromString(remainder.contents) {
  | Some(x) => mod(x, 97)
  | None => -1
  }
}

let mod10FromIntString: string => string = str => {
  let carry = ref(0)
  let ints = Js.String2.split(str, "")->Js.Array2.map(x =>
    switch Belt.Int.fromString(x) {
    | Some(x) => x
    | None => -1
    }
  )

  for i in 0 to Js.Array.length(ints) - 1 {
    let j = mod(carry.contents + Js.Array2.unsafe_get(ints, i), 10)
    carry := Js.Array2.unsafe_get([0, 9, 4, 6, 8, 2, 7, 1, 3, 5], j)
  }

  Belt.Int.toString(mod(10 - carry.contents, 10))
}

let validateWithRexp: (
  Data.opt<string>,
  string => option<array<option<string>>>,
  string,
) => Data.opt<string> = (o, fn, message) =>
  switch o {
  | Data.User({key, value}) =>
    switch fn(value) {
    | Some(xs) =>
      switch xs[0] {
      | Some(x) => Data.User({key, value: x})
      | None => Data.Error({
          id: "__ERROR_CAUSE_ID__",
          key,
          value,
          message
        })
      }
    | None => Data.Error({
        id: "__ERROR_CAUSE_ID__",
        key,
        value,
        message
      })
    }
  | t => t
  }

let validateWithPred: (Data.opt<'a>, string => bool, string) => Data.opt<'a> = (
  o,
  fn,
  message,
) =>
  switch o {
  | Data.User({key, value}) =>
    fn(value) ?
    Data.User({key, value}) :
    Data.Error({
      id: "__ERROR_CAUSE_ID__",
      key,
      value,
      message
    })
  | t => t
  }

let validateIban: Data.opt<string> => Data.opt<string> = o =>
  switch o {
  | Data.User({key, value}) => {
      let codeA = Js.String2.charCodeAt(`A`, 0)
      let codeZ = Js.String2.charCodeAt(`Z`, 0)
      value->(
        x =>
          (Js.String2.sliceToEnd(x, ~from=4) ++ Js.String2.substring(x, ~from=0, ~to_=4))
          ->Js.String2.split("")
          ->Js.Array2.map(x =>
            Js.String2.charCodeAt(x, 0)->(
              code =>
                code >= codeA && code <= codeZ ? Belt.Float.toString(code -. codeA +. 10.0) : x
            )
          )
          ->Js.Array2.joinWith("")
          ->mod97FromString
          ->(
            x =>
              x == 1
                ? Data.User({key, value})
                : Data.Error({
                    id: "__ERROR_CAUSE_ID__",
                    key,
                    value,
                    message: Checks.invalidChecksum(Belt.Int.toString(x), "1")
                  })
          )
      )
    }

  | t => t
  }

let validateQRR: Data.optSome<string> => Data.opt<string> = ({key, value}) => {
  let valTrim = Formatter.removeWhitespace(value)
  mod10FromIntString(valTrim)->(
    a => {
      let b = Js.String2.sliceToEnd(valTrim, ~from=26)
      a == b
        ? Data.User({key, value: valTrim})
        : Data.Error({
            id: "__ERROR_CAUSE_ID__",
            key,
            value: valTrim,
            message: Checks.invalidCheckDigit(a, b)
          })
    }->validateWithRexp(
      x => Js.String2.match_(x, %re("/^\S{27}$/")),
      Checks.invalidCharLenExact("27"),
    )
  )
}

let validateSCOR: Data.optSome<string> => Data.opt<string> = ov =>
  Data.User(ov)->validateWithRexp(//TODO: missing actual validation
  x =>
    Formatter.removeWhitespace(x)->Js.String2.match_(%re("/^\S{5,25}$/")),
    Checks.invalidCharLenMinMax("5", "25")
  )

let validateReference: (
  Data.opt<string>,
  Data.opt<string>,
) => Data.opt<string> = (reference, referenceType) =>
  switch reference {
  | Data.User({key, value}) =>
    switch referenceType {
    | Data.User(o) =>
      switch o.value {
      | "QRR" => validateQRR({key, value})
      | "SCOR" => validateSCOR({key, value})
      | _ =>
        Data.Error({
          id: "__ERROR_CAUSE_ID__",
          key,
          value,
          message: Checks.invalidReference
        })
      }
    | _ => reference
    }
  | _ => reference
  }

let validateAddressData: Data.opt<Data.address> => Data.opt<Data.address> =
  o =>
  switch o {
  | Data.User({key, value: ad}) =>
    Data.User({
      key,
      value: {
        addressType: ad.addressType,
        name: ad.name->validateWithRexp(
          x => Js.String2.trim(x)->Js.String2.match_(%re("/^[\s\S]{1,70}$/")),
          Checks.invalidCharLenMinMax("1", "70"),
        ),
        street: ad.street->validateWithRexp(
          x => Js.String2.trim(x)->Js.String2.match_(%re("/^[\s\S]{0,70}$/")),
          Checks.invalidCharLenMax("70"),
        ),
        houseNumber: ad.houseNumber->validateWithRexp(
          x => Js.String2.trim(x)->Js.String2.match_(%re("/^[\s\S]{0,16}$/")),
          Checks.invalidCharLenMax("16"),
        ),
        postCode: ad.postCode->validateWithRexp(
          x => Js.String2.trim(x)->Js.String2.match_(%re("/^[\s\S]{1,16}$/")),
          Checks.invalidCharLenMinMax("1", "16"),
        ),
        locality: ad.locality->validateWithRexp(
          x => Js.String2.trim(x)->Js.String2.match_(%re("/^[\s\S]{1,35}$/")),
          Checks.invalidCharLenMinMax("1", "35"),
        ),
        countryCode: ad.countryCode->validateWithRexp(
          x => Formatter.removeWhitespace(x)->Js.String2.match_(%re("/^\S{2}$/")),
          Checks.invalidCharLenExact("2"),
        ),
      },
    })
  | _ => o
  }

let validate: Data.init => Data.init = d => {
  d.referenceType
  ->validateWithRexp(
    x => Formatter.removeWhitespace(x)->Js.String2.match_(%re("/^(QRR|SCOR|NON)$/")),
    Checks.invalidOption(["QRR", "SCOR", "NON"]),
  )
  ->((referenceType): Data.init => {
      language: d.language->validateWithRexp(
        x => Formatter.removeWhitespace(x)->Js.String2.match_(%re("/^(en|de|fr|it)$/")),
        Checks.invalidOption(["en", "de", "fr", "it"]),
      ),
      currency: d.currency->validateWithRexp(
        x => Formatter.removeWhitespace(x)->Js.String2.match_(%re("/^(CHF|EUR)$/")),
        Checks.invalidOption(["CHF","EUF"]),
      ),
      amount: d.amount->validateWithPred(
        x =>
          Formatter.removeWhitespace(x)
          ->Js.Float.fromString
          ->Js.Float.toFixedWithPrecision(~digits=2)
          ->Js.Float.fromString
          ->(x => x >= 0.01 && x <= 999999999.99),
        Checks.invalidNumberRange("0.01", "999999999.99"),
      ),
      iban: d.iban
      ->validateWithRexp(
        x =>
          Formatter.removeWhitespace(x)
          ->Js.String2.toUpperCase
          ->Js.String2.match_(%re("/^(CH|LI)[0-9]{19}$/")),
        Checks.invalidIbanFormat,
      )
      ->validateIban,
      referenceType,
      reference: d.reference->validateReference(referenceType),
      message: d.message->validateWithRexp(
        x => Js.String2.trim(x)->Js.String2.match_(%re("/^[\s\S]{0,140}$/")),
        Checks.invalidCharLenMax("140"),
      ),
      messageCode: d.messageCode->validateWithRexp(
        x => Js.String2.trim(x)->Js.String2.match_(%re("/^[\s\S]{0,140}$/")),
        Checks.invalidCharLenMax("140"),
      ),
      creditor: d.creditor->validateAddressData,
      debtor: d.debtor->validateAddressData,
    }
  )
}

