module File = {
  type t
}


module FileReader = {
  type t

  @new
  external make
  : unit => t = "FileReader"

  @get
  external result
  : t => string = "result"

  @send
  external readAsText
  : (t, File.t) => unit = "readAsText"

  @send
  external addEventListener
  : (t, string, Dom.event => unit, {"once": bool}) => unit = "addEventListener"
}


module DataTransferItem = {
  type t

  @get
  external kind
  : t => string = "kind"

  @send
  external getAsFile
  : t => File.t = "getAsFile"
}


module DataTransfer = {
  type t
  type items = array<DataTransferItem.t>
  type files = array<File.t>

  @get
  external items
  : t => items = "items"

  @get
  external files
  : t => files = "files"
}
