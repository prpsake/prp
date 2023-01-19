type t

type resultFile = {
  file?: Webapi.File.t,
  error?: Error.Cause.structured
}

let toPromise =
  (listen, res) =>
  Promise.make(
    (resolve, _reject) => listen(.
      e => resolve(. res(. e))
    )
  )

let getFile: Webapi.Dom.InputEvent.t => resultFile = (e) => {
  switch Webapi.Dom.InputEvent.type_(e) {
  | "change" => {
      Webapi.Dom.InputEvent.target(e)
      ->EventTarget.files
      ->Webapi.FileList.item(0)
    }
  | _ =>
    switch Webapi.Dom.InputEvent.dataTransfer(e) {
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
  }->maybeFile => switch maybeFile {
  | Some(file) => {
      file: file,
      error: ?None
    }
  | None =>
    {
      file: ?None,
      error: {
        id_: "__ERROR_CAUSE_ID__",
        key: "file",
        message: "failed to get a valid file from the event"
      }
    }
  }
}
