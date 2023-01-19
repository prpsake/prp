type t = Dom.eventTarget
type listenerOptions = { once: bool }

@get external files: t => Webapi.FileList.t = "files"
@send external addEventListener: (t, string, Dom.event => unit, listenerOptions) => unit = "addEventListener"

let addEvent =
  (t, string, options) =>
  (. fn) =>
  addEventListener(t, string, fn, options)
