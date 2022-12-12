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
      .catch(
        Webapi.Error.resolveFromOriginal({
          name: "PaginatorError",
          message: "failed to set session properties",
        }),
      ),
    previewer
      .preview(
        viewElm.innerHTML,
        [{styles: host.session.style}],
        host.previewElm,
      )
      .catch(
        Webapi.Error.resolveFromOriginal({
          name: "PaginatorError",
          message: "failed to generate the preview",
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
