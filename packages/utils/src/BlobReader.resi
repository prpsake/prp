open Webapi

type onLoadFnParam = { result: string, file: File.t }
type onLoadFn = (. onLoadFnParam) => unit
type readFileParam = { e: Dom.InputEvent.t, onLoad: onLoadFn }


@genType
let readFileAsText: readFileParam => unit
