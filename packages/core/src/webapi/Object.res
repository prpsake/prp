type t<'k, 'v>

@scope("Object") @val external fromEntries: array<('k, 'v)> => t<'k, 'v> = "fromEntries"
@scope("Object") @val external entries: t<'k, 'v> => array<('k, 'v)> = "entries"
@scope("Object") @val external is: ('a, 'b) => bool = "is"
@send external toString: 'a => string = "toString"

let omitProp: (. t<'k, 'v>, string) => t<'k2, 'v2> = %raw(`
  (obj, key) => {
    const { [key]: _, ...rest } = obj
    return rest
  }
`)

let map: (. t<'k, 'v>, (('k, 'v)) => ('k2, 'v2)) => t<'k2, 'v2> =
  (. obj, mapFn) =>
  entries(obj)
  ->Js.Array2.map(mapFn)
  ->fromEntries

let isObject: 'a => bool =
  obj =>
  Boolean.boolean(obj) &&
  toString(obj) == "[object Object]"

