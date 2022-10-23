type t


let omitProp: (. t, string) => t = %raw(`
  (obj, key) => {
    const { [key]: _, ...rest } = obj
    return rest
  }
`)


let isObject: t => bool = %raw(`
  obj =>
  Boolean(obj?.constructor) &&
  Object.is(obj.constructor, Object)
`)

