type omitProp = (obj: object, key: string) => object
type isObject = (obj: object) => boolean

export type Obj = {
  omitProp: omitProp
  isObject: isObject
}
