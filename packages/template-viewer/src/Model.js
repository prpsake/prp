import {store} from "hybrids";
import Session from "./Session.js";

// NB(21.11.22): typing: there exist models with or without store connect symbol

export function makeWith({model, apiGet}) {
  return {
    templates: [""],
    [store.connect]: {
      offline: true,
      set: (_id, values) => values,
      get: apiGet,
    },
    ...model,
  };
}
