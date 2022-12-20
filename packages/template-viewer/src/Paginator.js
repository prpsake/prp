import {store} from "hybrids";
import {Webapi} from "@prpsake/core";
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
      .catch((_) =>
        Webapi.Error.resolveStructured({
          code: "FailedSessionModelUpdate",
          message:
            "failed to update session model properties language and/or title",
          operational: true,
        }),
      ),
    previewer
      .preview(
        viewElm.innerHTML,
        [{styles: host.session.style}],
        host.previewElm,
      )
      .catch((_) =>
        Webapi.Error.resolveStructured({
          code: "FailedPreviewRender",
          message: "failed to render preview",
          operational: true,
        }),
      ),
  ]).then(([session, previewer]) => {
    let value = {
      host,
      session: null,
      previewer: null,
      error,
    };

    session instanceof Error
      ? value.error.push(session)
      : (value.session = session);

    previewer instanceof Error
      ? value.error.push(previewer)
      : (value.previewer = session);

    return value;
  });
}
