type t = EventTarget.t

@new external make: unit => t = "FileReader"
@get external result: t => string = "result"
@send external readAsText: (t, Webapi.File.t) => unit = "readAsText"
