open Webapi

type onLoadFnParam = { result: string, file: File.t }
type onLoadFn = (. onLoadFnParam) => unit
type readFileParam = { e: Dom.InputEvent.t, onLoad: onLoadFn }


let readFileAsText: readFileParam => unit = ({ e, onLoad }) => {
  let reader = FileReader0.make()
  let file =
    switch Dom.InputEvent.type_(e) {
    | "change" => {
        Dom.InputEvent.target(e)
        ->EventTarget0.files
        ->FileList.item(0)
      }
    | _ => {
        let maybeDataTransfer = Dom.InputEvent.dataTransfer(e)
        switch maybeDataTransfer {
        | Some(dataTransfer) =>
          dataTransfer
          ->Dom.DataTransfer.items
          ->items => switch Dom.DataTransferItemList.get(items, 0) {
            | Some(item) => switch Dom.DataTransferItem.kind(item)->Dom.DataTransferItem.kindToString {
              | "file" => DataTransferItem0.getAsFile(item)
              | _ => None
              }
            | None =>
              dataTransfer
              ->Dom.DataTransfer.files
              ->FileList.item(0)
            }
        | None => None
        }
      }
    }->maybeFile => switch maybeFile {
    | Some(file) => file
    | None => Js.Exn.raiseError("No_file")
    }

  FileReader0.addEventListener(reader, "load", _e => {
    onLoad(. { result: FileReader0.result(reader), file })
  }, { once: true })

  FileReader0.readAsText(reader, file)
}
