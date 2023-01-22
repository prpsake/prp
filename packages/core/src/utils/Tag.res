let isCustom: string => bool =
  str =>
  switch Js.Types.classify(str) {
  | JSString(str) =>
    Js.Re.test_(%re("/^(([a-zA-Z][a-zA-Z0-9]+)(-[a-zA-Z0-9]+)+)$/"), str)
  | _ => false
  }
