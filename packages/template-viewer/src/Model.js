import {store} from "hybrids";
import Session from "./Session.js";

// NB(21.11.22): typing: there exist models with or without store connect symbol

export function connect(model) {
  return {
    templates: [""],
    [store.connect]: {
      offline: true,
      set: (_id, values) => values,
      get: () => {
        const {file} = store.get(Session);
        return fetch(`/data/${file}`)
          .then((resp) => resp.json())
          .catch((e) => console.log(e));
      },
    },
    ...model,
  };
}
