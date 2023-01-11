import {store} from "hybrids";

const SESSION_KEY = "prp:template:session";

export default {
  style: "",
  isDataFile: false,
  dataUrl: "",
  dataId: "",
  dataFile: "",
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

export function makeLocator(str) {
  if (typeof str !== "string") return {};

  const str_ = str.trim();
  const lastSeg = str_.replace(/^.*[\\\/]/, "");
  const isDataFile = lastSeg.endsWith(".json");

  return {
    isDataFile,
    dataUrl: isDataFile ? str_ : str_.replace(lastSeg, ""),
    dataId: !isDataFile ? lastSeg : "",
    dataFile: isDataFile ? lastSeg : "",
  };
}
