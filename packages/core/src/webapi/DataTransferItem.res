type t = Webapi.Dom.DataTransferItem.t

@send @return(nullable) external getAsFile: t => option<Webapi.File.t> = "getAsFile"
