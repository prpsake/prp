let compFromJson: Js.Dict.t<Js.Json.t> => Data.comp =
  x =>
  Parser.parse(x)
  ->Validator.validate
  ->Data.comp
