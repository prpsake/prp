open Webapi

type onLoadFnParam = { result: string, file: File.t }
type onLoadFn = (. onLoadFnParam) => unit
type readFileParam = { e: Dom.InputEvent.t, onLoad: onLoadFn }


let readFileAsText: readFileParam => unit = ({ e, onLoad }) => {
  let reader = FileReader.make()
  let file =
    switch Dom.InputEvent.type_(e) {
    | "change" => {
        Dom.InputEvent.target(e)
        ->EventTarget.files
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
              | "file" => DataTransferItem.getAsFile(item)
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

  FileReader.addEventListener(reader, "load", _e => {
    onLoad(. { result: FileReader.result(reader), file })
  }, { once: true })

  FileReader.readAsText(reader, file)
}


//export function readFileAsText ({ e, onLoad }) {
//  const reader = new FileReader()
//  let file
//
//  reader.addEventListener("load", (_e) => {
//    onLoad({ result: reader.result, file })
//  }, { once: true })
//
//  if (e.target.files?.[0]) {
//    file = e.target.files[0]
//  } else if (e.dataTransfer.items) if (e.dataTransfer.items?.[0].kind === "file") {
//    file = e.dataTransfer.items[0].getAsFile()
//  } else {
//    file = e.dataTransfer.files[0]
//  }
//
//  if (file) reader.readAsText(file)
//}



//open Webapi
//
//
//type target = {
//  files: array<File.t>
//}
//
//type event = {
//  target: target,
//  dataTransfer: DataTransfer.t
//}
//
//type onLoadParams = {
//  result: string,
//  file:  File.t
//}
//
//type readFileInit = {
//  e: event,
//  onLoad: (. onLoadParams) => unit
//}
//
//let readFileAsText: readFileInit => unit = params => {
//  let reader = FileReader.make()
//
//  let file = {
//    if Js.Array.length(params.e.target.files) > 0 {
//      params.e.target.files[0]
//
//    } else {
//      let items = DataTransfer.items(params.e.dataTransfer)
//      let files = DataTransfer.files(params.e.dataTransfer)
//
//      if Js.Array.length(items) > 0
//        && DataTransferItem.kind(items[0]) === "file" {
//        DataTransferItem.getAsFile(items[0])
//      } else {
//        files[0]
//      }
//    }
//  }
//
//  FileReader.addEventListener(reader, "load", (_e) => {
//    params.onLoad(. { result: FileReader.result(reader), file: file })
//  ()}, {"once": true})
//
//  FileReader.readAsText(reader, file)
//()}
