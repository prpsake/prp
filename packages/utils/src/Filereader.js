export function readFileAsText ({ e, onLoad }) {
  const reader = new FileReader()
  let file

  reader.addEventListener("load", (_e) => {
    onLoad({ result: reader.result, file })
  }, { once: true })

  if (e.target.files?.[0]) {
    file = e.target.files[0]
  } else if (e.dataTransfer.items) if (e.dataTransfer.items?.[0].kind === "file") {
    file = e.dataTransfer.items[0].getAsFile()
  } else {
    file = e.dataTransfer.files[0]
  }

  if (file) reader.readAsText(file)
}
