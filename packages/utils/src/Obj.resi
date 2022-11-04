let omitProp: (. Object.t<'k, 'v>, string) => Object.t<'k2, 'v2>
let map: (. Object.t<'k, 'v>, (('k, 'v)) => ('k2, 'v2)) => Object.t<'k2, 'v2>
let isObject: Object.t<'k, 'v> => bool
