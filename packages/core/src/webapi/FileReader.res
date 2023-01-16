type t
type listenerOptions = { once: bool }
type readFileValue = { result: string, file: Js.Nullable.t<Webapi.File.t>, error?: Error.Cause.structured }

@new external make: unit => t = "FileReader"
@get external result: t => string = "result"
@send external readAsText: (t, Webapi.File.t) => unit = "readAsText"
@send external addEventListener: (t, string, Dom.event => unit, listenerOptions) => unit = "addEventListener"

let readFileAsText: Webapi.File.t => Promise.t<readFileValue> = (file) => {
  let reader = make()
  let promise = Promise.make((resolve, _reject) =>{
    addEventListener(reader, "load", _e => {
      resolve(. {
        result: result(reader),
        file: Js.Nullable.return(file),
        error: ?None
      })
    }, { once: true })
  })
  readAsText(reader, file)
  promise
}
