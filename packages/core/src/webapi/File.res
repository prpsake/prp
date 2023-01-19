type resultText = {
  result?: string,
  file?: Webapi.Blob.t,
  error?: Error.Cause.structured
}

let toText: Webapi.Blob.t => Promise.t<resultText> =
  file => {
    if %raw(`(file instanceof Blob)`) {
      Webapi.Blob.text(file)
      ->Promise.thenResolve(text => {
       result: text,
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
          message: "failed to read"
        }
      }))
    } else {
      Promise.resolve({
        result: ?None,
        file: ?None,
        error: {
          id_: "__ERROR_CAUSE_ID__",
          key: "file",
          value: Error.Cause.valueToString(file),
          message: "is not a blob"
        }
      })
    }
  }
