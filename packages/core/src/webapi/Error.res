module Cause = {

  type structured = {
    code: string,
    key?: string,
    value?: string,
    message: string
  }

  let valueToString: 'a => string =
    x =>
    switch Js.Types.classify(x) {
    | JSObject(o) =>
      switch Js.Json.stringifyAny(o) {
      | Some(s) => s
      | None => "unknown"
      }
    | _ => Js.String2.make(x)
    }
}

type t

type structuredOptions = {
  cause: Cause.structured
}

@val external structured: (. string, structuredOptions) => t = "Error"
@send external toString: t => unit = "toString"

let makeStructured: Cause.structured => t =
  cause =>
  structured(. cause.message, {cause: cause})

let resolveStructured: Cause.structured => Promise.t<t> =
  cause =>
  makeStructured(cause)->Promise.resolve
