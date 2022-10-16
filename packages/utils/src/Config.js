/** @typedef {import('./Object.js').pojo} pojo */
import { proxyLiteralsByKey } from "./Object.js"



/** @type {(_: {mode: string, modes: string[], config: pojo}) => pojo} */
export const configFrom =
  ({ mode, modes, config }) =>
  proxyLiteralsByKey({ key: mode, keys: modes, obj: {mode, ...config} })
