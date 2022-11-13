import { store } from "hybrids"
import { Previewer } from "./lib/paged.lib.js"


import Session from "./Session.js"


export function preview ({ host }) {
  host.previewElm.addEventListener("transitionend", () => {
    const previewer = new Previewer()
    const pageElm = host.querySelector(".view").firstElementChild.shadowRoot

    host.previewElm.innerHTML = ""
    document.head.querySelectorAll("styleApp").forEach(elm => elm.remove())
    store.set(Session, {
      lang: pageElm.host.data.lang,
      title: pageElm.host.data.title
    })

    previewer
    .preview(pageElm.innerHTML, [{ styles: host.session.style }], host.previewElm)
    .then(res => {
      //console.log(res)
      host.previewElm.classList.replace("opacity-0", "opacity-100")
    })
  }, { once: true })

  host.style.position = "fixed" // NB: workaround pagedjs removing postion fixed properties.
  host.previewElm.classList.replace("opacity-100", "opacity-0")
}
