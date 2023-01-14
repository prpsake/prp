import {define, html, router, store} from "hybrids";
import {Webapi} from "@prpsake/core";
import Session from "./Session.js";

// NB(21.11.22): typing: model must have store connect symbol

export function makeWith({view, model, key, dataId}) {
  return define({
    [router.connect]: {url: `/${key}/:dataId`, multiple: true},
    tag: `view-${key}`,
    dataId,
    data: store(model, {id: ({dataId}) => ({id: dataId})}),
    session: store(Session),
    render: ({data, session}) =>
      store.ready(data) && store.ready(session)
        ? view({data, session: Webapi.Object.omitProp(session, "style")})
        : html``,
  });
}
