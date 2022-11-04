let omitProp: (. Object.t<'k, 'v>, string) => Object.t<'k2, 'v2> = %raw(`
  (obj, key) => {
    const { [key]: _, ...rest } = obj
    return rest
  }
`)


let map: (. Object.t<'k, 'v>, (('k, 'v)) => ('k2, 'v2)) => Object.t<'k2, 'v2> =
  (. obj, mapFn) =>
  Object.entries(obj)
  ->Array.map(mapFn)
  ->Object.fromEntries



let isObject: 'a => bool =
  obj =>
  Boolean.boolean(obj) &&
  Object.toString(obj) == "[object Object]"
