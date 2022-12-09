type t
type listenerOptions = { once: bool }
type readFileParam = { e: Webapi.Dom.InputEvent.t }
type textResult = { result: string, file: Webapi.File.t }

@new external make: unit => t = "FileReader"
@get external result: t => string = "result"
@send external readAsText: (t, Webapi.File.t) => unit = "readAsText"
@send external addEventListener: (t, string, Dom.event => unit, listenerOptions) => unit = "addEventListener"

let readFileAsText: readFileParam => Promise.t<textResult> = ({ e }) => {
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

  let promise = Promise.make((resolve, _reject) =>{
    addEventListener(reader, "load", _e => {
      resolve(. { result: result(reader), file })
    }, { once: true })
  })

  readAsText(reader, file)
  promise
}
