import {store} from "hybrids";
import {Previewer} from "./lib/paged.lib.js";
import Session from "./Session.js";

export function preview({host, error = []}) {
  const previewer = new Previewer();
  const viewElm = host.querySelector(".view").firstElementChild.shadowRoot;

  host.previewElm.innerHTML = "";
  document.head.querySelectorAll("style").forEach((elm) => elm.remove());

  return Promise.all([
    store
      .set(Session, {
        language: viewElm.host.data.language,
        title: viewElm.host.data.title,
      })
      .catch((_) => ({
        error_: {
          code: "__ERROR_CAUSE_ID__",
          key: "language,title",
          message: "failed to update session model"
        },
      })),
    previewer
      .preview(
        viewElm.innerHTML,
        [{styles: host.session.style}],
        host.previewElm,
      )
      .catch((_) => ({
        error_: {
          code: "__ERROR_CAUSE_ID__",
          message: "failed to render preview"
        },
      })),
  ]).then(([session, previewer]) => {
    let value = {
      host,
      session: null,
      previewer: null,
      error,
    };

    session.error_
      ? value.error.push(session.error_)
      : (value.session = session);

    previewer.error_
      ? value.error.push(previewer.error_)
      : (value.previewer = previewer);

    return value;
  });
}
