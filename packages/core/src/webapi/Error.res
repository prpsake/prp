/**
Operational Errors

- failed to connect to server
- failed to resolve hostname
- invalid user input
- request timeout
- server returned a 500 response
- socket hang-up
- system is out of memory

Programmer Errors

- called an asynchronous function without a callback
- did not resolve a promise
- did not catch a rejected promise
- passed a string where an object was expected
- passed an object where a string was expected
- passed incorrect parameters in a function

*/

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
