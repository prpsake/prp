import {store} from "hybrids";

const SESSION_KEY = "prp:template:session";

export default {
  style: "",
  language: "",
  title: "",
  viewVertical: false,
  [store.connect]: {
    get: () => {
      if (sessionStorage.getItem(SESSION_KEY)) {
        const jsonString = sessionStorage.getItem(SESSION_KEY);
        return JSON.parse(jsonString);
      }
      return {};
    },
    set: (_id, values, _keys) => {
      const jsonString = JSON.stringify(values);
      sessionStorage.setItem(SESSION_KEY, jsonString);
      return values;
    },
    observe: (_id, values, _lastValues) => {
      if (values.language) document.documentElement.lang = values.language;
      if (values.title)
        document.title = import.meta.env.PROD
          ? values.title
          : `[${import.meta.env.MODE.toUpperCase()}] ${values.title}`;
    },
  },
};
