import {defineWith} from "../index.js";
import style from "./style.css?inline";

defineWith({
  templates: {
    blub: {
      model: {},
      view: () => "",
    },
  },
  api: {
    idKey: "blah",
    get: () => {},
    list: () => {},
  },
}).catch(console.log);
