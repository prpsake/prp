type t
type listenerOptions = { once: bool }
type onLoadFnParam = { result: string, file: Webapi.File.t }
type onLoadFn = (. onLoadFnParam) => unit
type readFileParam = { e: Webapi.Dom.InputEvent.t, onLoad: onLoadFn }

@new external make: unit => t = "FileReader"
@get external result: t => string = "result"
@send external readAsText: (t, Webapi.File.t) => unit = "readAsText"
@send external addEventListener: (t, string, Dom.event => unit, listenerOptions) => unit = "addEventListener"

let readFileAsText: readFileParam => unit = ({ e, onLoad }) => {
  let reader = make()
  let file =
    switch Webapi.Dom.InputEvent.type_(e) {
    | "change" => {
        Webapi.Dom.InputEvent.target(e)
        ->EventTarget.files
        ->Webapi.FileList.item(0)
      }
    | _ => {
        let maybeDataTransfer = Webapi.Dom.InputEvent.dataTransfer(e)
        switch maybeDataTransfer {
        | Some(dataTransfer) =>
          dataTransfer
          ->Webapi.Dom.DataTransfer.items
          ->items => switch Webapi.Dom.DataTransferItemList.get(items, 0) {
            | Some(item) => switch Webapi.Dom.DataTransferItem.kind(item)->Webapi.Dom.DataTransferItem.kindToString {
              | "file" => DataTransferItem.getAsFile(item)
              | _ => None
              }
            | None =>
              dataTransfer
              ->Webapi.Dom.DataTransfer.files
              ->Webapi.FileList.item(0)
            }
        | None => None
        }
      }
    }->maybeFile => switch maybeFile {
    | Some(file) => file
    | None => Js.Exn.raiseError("No_file")
    }

  addEventListener(reader, "load", _e => {
    onLoad(. { result: result(reader), file })
  }, { once: true })

  readAsText(reader, file)
}
