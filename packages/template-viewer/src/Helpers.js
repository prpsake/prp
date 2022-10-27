import {define, html, router, store} from "hybrids"
import { Obj } from "@prpsake/utils"

import Session from "./Session"


export function modelsFromTemplates({templates}) {
  return Obj.map(
    templates,
    ([key, template]) => {
      return [key, {
        view: template.view,
        model: {
          templates: [""],
          ...(Obj.omitProp(template.model, "connect")),
          [store.connect]: {
            offline: true,
            set: (_id, values) => values,
            get: () => {
              const {useFile, file} = store.get(Session)
              if (!useFile && template.model.connect) {
                return template.model.connect
              } else {
                return fetch(`/data/${file}`)
                  .then(resp => resp.json())
                  .catch(e => console.log(e))
              }
            }
          }
        }
      }]
    }
  )
}


export const viewsFromTemplates = ({templates}) => {
  return Object.entries(templates).map(([key, template]) => {
    return define({
      [router.connect]: {url: "/" + key},
      tag: "view-" + key,
      data: store(template.model),
      session: store(Session),
      render: ({data, session}) =>
        store.ready(data) && store.ready(session)
          ? template.view({data})
          : html``
    })
  })
}
