type omitProp = (obj: Record<string, any>, key: string) => Record<string, any>
type map = (obj: Record<string, any>, mapFn: (param: [string, any]) => [string, any]) => Record<string, any>
type isObject = (obj: Record<string, any>) => boolean

export type Obj = {
  omitProp: omitProp
  map: map
  isObject: isObject
}
