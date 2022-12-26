module Cause = {
  type structured = {
    code: string,
    message: string,
    operational: bool,
    key?: string,
    value?: string
  }

  type caught = {
    name: string,
    message: string,
    fileName?: string,
    lineNumber?: int,
    columnNumber?: int,
    stack?: string
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

type caughtOptions = {
  cause: Cause.caught
}

@val external structured: (. string, structuredOptions) => t = "Error"
@val external caught: (. string, caughtOptions) => t = "Error"
@send external toString: t => unit = "toString"

let makeStructured: Cause.structured => t =
  cause =>
  structured(. cause.message, {cause: cause})

let makeCaught: Cause.caught => t =
  cause =>
  caught(. cause.message, {cause: cause})

let resolveStructured: Cause.structured => Promise.t<t> =
  cause =>
  makeStructured(cause)->Promise.resolve

let resolveCaught: Cause.caught => Promise.t<t> =
  cause =>
  makeCaught(cause)->Promise.resolve
