import {define, html, router, store} from "hybrids";
import Session from "./Session.js";

// NB(21.11.22): typing: model must have store connect symbol

export function defineWith({key, view, model}) {
  return define({
    [router.connect]: {url: "/" + key},
    tag: "view-" + key,
    data: store(model),
    session: store(Session),
    render: ({data, session}) =>
      store.ready(data) && store.ready(session) ? view({data}) : html``,
  });
}