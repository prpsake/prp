import {define, html, router, store} from "hybrids";
import {Webapi} from "@prpsake/core";
import Session from "./Session.js";

// NB(21.11.22): typing: model must have store connect symbol

export function makeWith({key, view, model, locator}) {
  return define({
    [router.connect]: {url: `/${key}/:id`},
    tag: `view-${key}`,
    dataId: locator.dataId,
    data: store(model, {id: ({dataId}) => dataId}),
    session: store(Session),
    render: ({data, session}) =>
      store.ready(data) && store.ready(session)
        ? view({data, session: Webapi.Object.omitProp(session, "style")})
        : html``,
  });
}
