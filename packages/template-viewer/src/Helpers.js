import {define, html, router, store} from "hybrids";
import Session from "./Session";


export function modelsFromTemplates({templates}) {
  return Object
    .fromEntries(Object
      .entries(templates)
      .map(([key, template]) => [key, {
          content: template.content,
          model: {
            templates: [""],
            ...(template.model),
            [store.connect]: {
              offline: true,
              set: (_id, values) => values,
              get: () => {
                const {file} = store.get(Session)
                return fetch(`/data/${file}`)
                  .then(resp => resp.json())
                  .catch(e => console.log(e))
              }
            }
          }
        }]
      ))
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
          ? template.content({data})
          : html``
    })
  })
}
