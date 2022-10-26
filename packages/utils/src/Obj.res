type t<'k, 'v>


let omitProp: (. t<'k, 'v>, string) => t<'k2, 'v2> = %raw(`
  (obj, key) => {
    const { [key]: _, ...rest } = obj
    return rest
  }
`)


let map: (. t<'k, 'v>, (('k, 'v)) => ('k2, 'v2)) => t<'k2, 'v2> = %raw(`
  (obj, mapFn) =>
  Object.fromEntries(Object.entries(obj).map(mapFn))
`)


let isObject: t<'k, 'v> => bool = %raw(`
  obj =>
  Boolean(obj && obj.constructor) &&
  Object.is(obj.constructor, Object)
`)

