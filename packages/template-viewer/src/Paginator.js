import {store} from "hybrids";
import {Previewer} from "./lib/paged.lib.js";
import Session from "./Session.js";

export function preview({host, onSuccess, onError = console.log}) {
  host.previewElm.addEventListener(
    "transitionend",
    () => {
      const previewer = new Previewer();
      const viewElm = host.querySelector(".view").firstElementChild.shadowRoot;

      host.previewElm.innerHTML = "";
      document.head.querySelectorAll("styleApp").forEach((elm) => elm.remove());

      Promise.all([
        store
          .set(Session, {
            language: viewElm.host.data.language,
            title: viewElm.host.data.title,
          })
          .then((data) => data),
        previewer.preview(viewElm.innerHTML, [{styles: host.session.style}], host.previewElm).then((data) => data),
      ])
        .then(([session, previewer]) => {
          onSuccess?.({session, previewer});
          host.previewElm.classList.replace("opacity-0", "opacity-100");
        })
        .catch(onError);
    },
    {once: true},
  );

  host.previewElm.classList.replace("opacity-100", "opacity-0");
}
