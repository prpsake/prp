type readFileAsText = (param: {
  e: InputEvent,
  onLoad: (param: { result: string, file: File }) => void
}) => void

export type BlobReader = {
  readFileAsText: readFileAsText
}
