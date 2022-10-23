type t


let omitProp: (t, string) => t = %raw(`
  (obj, key) => {
    const { [key]: _, ...rest } = obj
    return rest
  }
`)


let isObject: {..} => bool = %raw(`
  obj =>
  Boolean(obj?.constructor) &&
  Object.is(obj.constructor, Object)
`)


// @type {(_: {key: string, keys: string[], obj: pojo}) => pojo}
//export const proxyLiteralsByKey =
//  ({ key, keys, obj }) =>
//  new Proxy(obj, {
//    get(obj, prop) {
//      if (Boolean(obj[prop]?.constructor) && Object.is(obj[prop].constructor, Object)) {
//        if (key in obj[prop]) return obj[prop][key]
//        if (keys.some(key => key in obj[prop])) return null
//        return proxyLiteralsByKey({ key, keys, obj: obj[prop] })
//      }
//      return obj[prop]
//    }
//  })





