type t<'k, 'v>


let omitProp: (. t<'k, 'v>, string) => t<'k2, 'v2>
let map: (. t<'k, 'v>, (('k, 'v)) => ('k2, 'v2)) => t<'k2, 'v2>
let isObject: t<'k, 'v> => bool

