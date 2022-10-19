type t
type listenerOptions = { once: bool }

@new external make: unit => t = "FileReader"

@get external result: t => string = "result"

@send external readAsText: (t, Webapi.File.t) => unit = "readAsText"
@send external addEventListener: (t, string, Dom.event => unit, listenerOptions) => unit = "addEventListener"
