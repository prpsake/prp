import {store} from "hybrids";
import Session from "./Session.js";

// NB(21.11.22): typing: there exist models with or without store connect symbol

export function makeWith({model, locator}) {
  return {
    templates: [""],
    [store.connect]: {
      offline: true,
      set: (_id, values) => values,
      get: (id) => {
        //const {dataUrl, dataId, dataFile} = store.get(Session);
        return fetch(`${locator.dataUrl}/${id}`)
          .then((resp) => resp.json())
          .catch((e) => console.log(e));
      },
    },
    ...model,
  };
}
