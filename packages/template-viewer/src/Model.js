import {store} from "hybrids";
import {Webapi} from "@prpsake/core";
import Session from "./Session.js";

// NB(21.11.22): typing: there exist models with or without store connect symbol

export function connect(model) {
  return {
    templates: [""],
    ...Webapi.Object.omitProp(model, "connect"),
    [store.connect]: {
      offline: true,
      set: (_id, values) => values,
      get: () => {
        const {useFile, file} = store.get(Session);
        if (!useFile && model.connect) {
          return model.connect;
        } else {
          return fetch(`/data/${file}`)
            .then((resp) => resp.json())
            .catch((e) => console.log(e));
        }
      },
    },
  };
}
