type resultText = {
  result?: string,
  file?: Webapi.File.t,
  error?: Error.Cause.structured
}

let toText: Webapi.File.t => Promise.t<resultText> =
  file =>
  FileReader.make()
  ->reader => (
    reader,
    Promise.race([
      EventTarget.addEvent(reader, "load", {once: true})
      ->Event.toPromise((. _e) => {
        result: FileReader.result(reader),
        file: file,
        error: ?None
      })
      ->Promise.catch(_exn => Promise.resolve({
        result: ?None,
        file: ?None,
        error: {
          id_: "__ERROR_CAUSE_ID__",
          key: "file",
          value: Error.Cause.valueToString(file),
          message: "failed to load a file"
        }
      })),
      EventTarget.addEvent(reader, "error", {once: true})
      ->Event.toPromise((. _e) => {
        result: ?None,
        file: ?None,
        error: {
          id_: "__ERROR_CAUSE_ID__",
          key: "file",
          value: Error.Cause.valueToString(file),
          message: "failed to read the file"
        }
      })
    ])
  )
  ->((reader, promise)) => {
    // TODO: Use newer Blob API instead of the FilerReader
    FileReader.readAsText(reader, file)
    promise
  }
