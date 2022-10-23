open Webapi

type onLoadFnParam = { result: string, file: File.t }
type onLoadFn = (. onLoadFnParam) => unit
type readFileParam = { e: Dom.InputEvent.t, onLoad: onLoadFn }


let readFileAsText: readFileParam => unit
