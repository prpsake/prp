import { store } from "hybrids"


export default {
  style: "",
  useFile: false,
  file: "invoice-sample.json",
  lang: "",
  title: "",
  viewVertical: false,
  [store.connect]: {
    get: () => {
      if (sessionStorage.getItem("prp:template:session")) {
        const jsonString = sessionStorage.getItem("prp:template:session")
        return JSON.parse(jsonString)
      }
      return {}
    },
    set: (_id, values, _keys) => {
      const jsonString = JSON.stringify(values)
      sessionStorage.setItem("prp:template:session", jsonString)
      return values
    },
    observe: (_id, values, _lastValues) => {
      if (values.lang) document.documentElement.lang = values.lang
      if (values.title) document.title =
          import.meta.env.PROD
          ? values.title
          : `[${import.meta.env.MODE.toUpperCase()}] ${values.title}`
    }
  }
}
