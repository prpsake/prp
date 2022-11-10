let omitProp: (. Object0.t<'k, 'v>, string) => Object0.t<'k2, 'v2> = %raw(`
  (obj, key) => {
    const { [key]: _, ...rest } = obj
    return rest
  }
`)


let map: (. Object0.t<'k, 'v>, (('k, 'v)) => ('k2, 'v2)) => Object0.t<'k2, 'v2> =
  (. obj, mapFn) =>
  Object0.entries(obj)
  ->Array0.map(mapFn)
  ->Object0.fromEntries



let isObject: 'a => bool =
  obj =>
  Boolean0.boolean(obj) &&
  Object0.toString(obj) == "[object Object]"
