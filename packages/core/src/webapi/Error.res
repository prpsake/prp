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

type t

type details<'a, 'e> = {
  name: string,
  key?: string,
  value?: 'a,
  message: string,
  cause?: 'e
}

@val external error: (. string, details<'a, 'e>) => t = "Error"

let make: details<'a, 'e> => t = details => error(. details.message, details)

let fromOriginal: details<'a, 'e> => (. 'e) => t =
  details =>
  (. cause) =>
  error(. details.message, {
    name: details.name,
    key: ?details.key,
    value: ?details.value,
    message: details.message,
    cause: ?cause
  })

let resolveFromOriginal: details<'a, 'e> => (. 'e) => Promise.t<t> =
  details =>
  (. cause) =>
  error(. details.message, {
    name: details.name,
    key: ?details.key,
    value: ?details.value,
    message: details.message,
    cause: ?cause
  })->Promise.resolve
