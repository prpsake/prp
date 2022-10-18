open Webapi


type target = {
  files: array<File.t>
}

type event = {
  target: target,
  dataTransfer: DataTransfer.t
}

type onLoadParams = {
  result: string,
  file:  File.t
}

type readFileInit = {
  e: event,
  onLoad: (. onLoadParams) => unit
}

let readFileAsText: readFileInit => unit = params => {
  let reader = FileReader.make()

  let file = {
    if Js.Array.length(params.e.target.files) > 0 {
      params.e.target.files[0]

    } else {
      let items = DataTransfer.items(params.e.dataTransfer)
      let files = DataTransfer.files(params.e.dataTransfer)

      if Js.Array.length(items) > 0
        && DataTransferItem.kind(items[0]) === "file" {
        DataTransferItem.getAsFile(items[0])
      } else {
        files[0]
      }
    }
  }

  FileReader.addEventListener(reader, "load", (_e) => {
    params.onLoad(. { result: FileReader.result(reader), file: file })
  ()}, {"once": true})

  FileReader.readAsText(reader, file)
()}
