import {define, html, router, store} from "hybrids";
import {Webapi} from "@prpsake/core";
import Session from "./Session.js";

// NB(21.11.22): typing: model must have store connect symbol

export function makeWith({view, model, key, initDatasetId}) {
  return define({
    [router.connect]: {url: `/${key}/:datasetId`, multiple: true},
    tag: `view-${key}`,
    datasetId: initDatasetId,
    data: store(model, {id: ({datasetId}) => ({id: datasetId})}),
    session: store(Session),
    render: ({data, session}) =>
      store.ready(data) && store.ready(session)
        ? view({data, session: Webapi.Object.omitProp(session, "style")})
        : html``,
  });
}
