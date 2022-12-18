type t
type listenerOptions = { once: bool }
type readFileValue = { result: string, file: Js.Nullable.t<Webapi.File.t>, error?: Error.t }

@new external make: unit => t = "FileReader"
@get external result: t => string = "result"
@send external readAsText: (t, Webapi.File.t) => unit = "readAsText"
@send external addEventListener: (t, string, Dom.event => unit, listenerOptions) => unit = "addEventListener"

let readFileAsText: Webapi.Dom.InputEvent.t => Promise.t<readFileValue> = (e) => {
  let reader = make()
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
          | Some(item) => switch (
            Webapi.Dom.DataTransferItem.kind(item)->Webapi.Dom.DataTransferItem.kindToString,
            Webapi.Dom.DataTransferItem.itemType(item)
            ) {
            | ("file", "application/json") => DataTransferItem.getAsFile(item)
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
  | Some(file) =>
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
  | None =>
    Promise.resolve({
      result: "",
      file: Js.Nullable.null,
      error: Error.makeStructured({
        code: "InvalidFile",
        message: "failed to load json file",
        operational: true
      })
    })
  }
}
