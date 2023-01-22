import styleApp from "./style.css?inline";
import {store, define, router, html} from "hybrids";
import {QrBill} from "@prpsake/qr-bill";
import {Webapi, Utils} from "@prpsake/core";
import {makeWith as makeModelWith} from "./Model.js";
import {makeWith as makeViewWith} from "./View.js";
import {preview} from "./Paginator.js";
import Session from "./Session.js";

if (import.meta.env.EXP_ROUTER_DEBUG) router.debug();
if (import.meta.hot) import.meta.hot.accept();

const TemplateViewer = ({
  templates,
  dataIds,
  // NB: not supported for now
  // onFileInput,
  // onFileDrop,
  onError,
  error,
}) => ({
  session: store(Session),
  previewElm: {
    value: undefined,
    connect: (host, key) => {
      readyView({host}).then(({host}) => {
        host[key] = host.querySelector(".template-view");
        togglePreview({host, error})
          .then(preview)
          .then(togglePreview)
          .then(handleError);
      });
    },
  },
  view: router(
    templates.map(({view}) => view),
    {url: `/${templates[0].key}/${dataIds[0]}`},
  ),
  showPreview: true,
  error: {
    set: (host, values = []) =>
      Object.values(values.reduce((a, b) => ((a[b.id_] = b), a), {})),
    observe: (host, values) => {
      if (values.length > 0) {
        onError({host, error: values});
      }
    },
  },
  content: ({session, view, showPreview}) =>
    html`
      <div
        class="hidden view"
        onerror=${handleViewError}>
        ${view}
      </div>
      <div
        class=${{
          "template-view": true,
          relative: true,
          "overscroll-x-contain": true,
          "opacity-100": showPreview,
          "opacity-0": !showPreview,
          "transition-opacity": true,
          "duration-300": true,
          "preview-sm": !session.viewVertical,
        }}></div>
      <!--
        NB: not supported for now
        ondragover=(e) => e.preventDefault()
        ondrop=onFileDrop></div>
      -->

      <aside
        class="fixed bottom-0 right-0 p-8 w-96 font-sans text-system-fg prp-template-viewer-app">
        <div class="flex flex-col items-end">
          <div>
            <ul class="text-right">
              ${templates.map(({view: view_, key}) =>
                dataIds.map(
                  (dataId) => html`
                    <li class="mb-2">
                      <a
                        class="inline-block px-2 py-1 drop-shadow-sm rounded-md bg-action-bg hover:bg-action-hover-bg font-light text-sm text-gray-200 select-none"
                        href="${router.url(view_, {dataId})}"
                        onclick=${previewOnClick}>
                        ${key} ${dataId}
                      </a>
                    </li>
                  `,
                ),
              )}
            </ul>
          </div>
          <div class="mb-2">
            <button
              class="flex w-11 h-11 p-3 drop-shadow-sm rounded-md bg-action-bg hover:bg-action-hover-bg"
              type="button"
              onclick=${toggleMode}>
              <div class="w-full h-full text-gray-200">
                <svg
                  class=${{
                    block: true,
                    "fill-current": true,
                    "rotate-90": !session.viewVertical,
                  }}
                  width="100%"
                  height="100%"
                  viewBox="0 0 512 512">
                  <path
                    d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                </svg>
              </div>
            </button>
          </div>
          <!-- NB: not supported for now
          <div>
            <input
              class="hidden"
              type="file"
              id="control-file"
              name="file"
              accept="application/json"
              onchange=onFileInput />
            <label
              class="flex justify-between w-11 h-11 drop-shadow-sm bg-action-bg hover:bg-action-hover-bg rounded-md text-gray-200 cursor-pointer select-none"
              for="control-file">
              <div
                class="w-0 overflow-hidden opacity-0 flex-auto font-light text-sm truncate onhover-show">
                session.title
              </div>
              <div class="w-11 w-11 p-3 text-gray-200">
                <svg
                  class="block fill-current"
                  width="100%"
                  height="100%"
                  viewBox="0 0 512 512">
                  <path
                    d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z" />
                </svg>
              </div>
            </label>
          </div>
          -->
        </div>
      </aside>
    `.style(styleApp),
});

export function defineWith({
  templates,
  tag = "template-viewer",
  tagQrBill,
  api,
  onError,
  style,
}) {
  // initiate the error cause array
  let error = [];

  // override an invalid onError user argument with the default value
  if (typeof onError !== "function") {
    onError = console.log;
  }

  // initiate falsy qr bill custom tag variable, its value may be overridden
  // by a valid user argument
  let tagQrBill_ = "";

  // user opts for the default qr bill custom tag
  if (tagQrBill === true) {
    tagQrBill_ = "qr-bill";

    // user opts for a custom qr bill custom tag
  } else if (typeof tagQrBill === "string") {
    // check if the custom qr bill custom tag has a valid format and
    // override initial falsy variable value
    if (Utils.Tag.isCustom(tagQrBill)) {
      tagQrBill_ = tagQrBill;

      // store an error cause if the custom qr bill custom tag has not a valid
      // format
    } else {
      error.push({
        id_: "__ERROR_CAUSE_ID__",
        key: "tagQrBill",
        value: tagQrBill,
        message: "must be a valid custom tag string value or a boolean",
      });
    }
  }

  // define the custom element if the custom tag string value is valid
  if (Boolean(tagQrBill_)) {
    define({
      ...QrBill,
      tag: tagQrBill_,
      class: "absolute bottom-0 left-0",
    });
  }

  // initially assume an api connection, its value may be overridden by
  // invalid or inexistent user arguments
  let tryApi = true;

  // user opts for an api connection
  if (Boolean(api)) {
    // if the user did not specify the id key for single item requests,
    // store an error cause and negate the api connection
    if (typeof api.idKey !== "string") {
      error.push({
        id_: "__ERROR_CAUSE_ID__",
        key: "api.idKey",
        value: Webapi.Error.Cause.valueToString(api?.idKey),
        message: "must be a string",
      });
      tryApi = false;
    }

    // if the user did not specify the get function for single item
    // requests, store an error cause and negate the api connection
    if (typeof api.get !== "function") {
      error.push({
        id_: "__ERROR_CAUSE_ID__",
        key: "api.get",
        value: Webapi.Error.Cause.valueToString(api?.get),
        message: "must be a function",
      });
      tryApi = false;
    }

    // if the user did not specify the list function for the list request,
    // store an error cause and negate the api connection
    if (typeof api.list !== "function") {
      error.push({
        id_: "__ERROR_CAUSE_ID__",
        key: "api.list",
        value: Webapi.Error.Cause.valueToString(api?.list),
        message: "must be a function",
      });
      tryApi = false;
    }

    // user did not opt for an api connection
  } else {
    error.push({
      id_: "__ERROR_CAUSE_ID__",
      key: "api",
      value: Webapi.Error.Cause.valueToString(api),
      message: "must be an object literal",
    });
    tryApi = false;
  }

  // initially assume templates, its value may be overridden by
  // invalid or inexistent user arguments
  let tryTemplates = true;

  if (Boolean(templates)) {
    if (!Webapi.Object.isObject(templates)) {
      error.push({
        id_: "__ERROR_CAUSE_ID__",
        key: "templates",
        value: Webapi.Error.Cause.valueToString(templates),
        message: "must be an object literal",
      });
      tryTemplates = false;
    }

    let templateValues = Object.values(templates);

    if (templateValues.length < 1) {
      error.push({
        id_: "__ERROR_CAUSE_ID__",
        key: "templates",
        value: Webapi.Error.Cause.valueToString(templateValues),
        message: "must contain at least one template object literal",
      });
    }

    if (!Webapi.Object.isObject(templateValues[0].model)) {
      error.push({
        id_: "__ERROR_CAUSE_ID__",
        key: "templates.model",
        value: Webapi.Error.Cause.valueToString(templateValues[0].model),
        message: "must be an object literal",
      });
      tryTemplates = false;
    }

    if (typeof templateValues[0].view !== "function") {
      error.push({
        id_: "__ERROR_CAUSE_ID__",
        key: "templates.view",
        value: Webapi.Error.Cause.valueToString(templateValues[0].view),
        message: "must be a function",
      });
      tryTemplates = false;
    }
  } else {
    error.push({
      id_: "__ERROR_CAUSE_ID__",
      key: "templates",
      value: Webapi.Error.Cause.valueToString(templates),
      message: "must be an object literal",
    });
    tryTemplates = false;
  }

  if (!(tryApi && tryTemplates)) {
    api = {
      idKey: "id",
      get: ({id}) => ({
        id,
        foo: "bar",
      }),
      list: () => [
        {
          id: 1,
          foo: "bar",
        },
      ],
    };

    templates = {
      baz: {
        model: {
          id: true,
          foo: "",
        },
        view: ({data}) => html` <div>${data.foo}</div> `,
      },
    };
  }

  // TODO: implement definition failure
  return Promise.all([api.list(), store.set(Session, {style})]).then(
    ([list, _session]) => {
      const dataIds = list.map(({[api.idKey]: k}) => String(k));
      const templatesMade = Webapi.Object.map(
        templates,
        ([key, {model, view}]) => {
          const modelMade = makeModelWith({model, apiGet: api.get});
          const viewMade = makeViewWith({
            view,
            model: modelMade,
            key,
            dataId: dataIds[0],
          });
          return [key, {key, view: viewMade, model: modelMade}];
        },
      );

      return define({
        tag,
        ...TemplateViewer({
          templates: Object.values(templatesMade),
          dataIds,
          // NB: not supported for now
          // onFileInput: previewOnFileInputFn({
          //   templates: templatesMade,
          // }),
          // onFileDrop: previewOnFileInputFn({
          //   templates: templatesMade,
          //   preventDefault: true,
          // }),
          onError,
          error,
        }),
      });
    },
  );
}

/* TODO: implement rejection */
function readyView({host}) {
  return new Promise((resolve, _reject) => {
    new MutationObserver((mutations, observer) => {
      for (const mutation of mutations)
        if (mutation.addedNodes[0]?.tagName?.startsWith("VIEW-")) {
          observer.disconnect();
          resolve({host});
          break;
        }
    }).observe(host, {subtree: true, childList: true});
  });
}

function previewOnFileInputFn({templates, preventDefault = false}) {
  return function previewOnFileInput(host, e) {
    preventDefault && e.preventDefault();
    const {file, error: fileError} = Webapi.Event.getFile(e);
    if (fileError) {
      handleError({host, error: [fileError]});
    } else if (file) {
      readTemplateJsonData({host, file, templates})
        .then(togglePreview)
        .then(preview)
        .then(togglePreview)
        .then(handleError);
    }
  };
}

function previewOnClick(host, _e) {
  togglePreview({host}).then(preview).then(togglePreview);
}

function toggleMode(host, _e) {
  const {viewVertical} = store.get(Session);
  store.set(Session, {viewVertical: !viewVertical});
}

function togglePreview({host, error = []}) {
  let timeout;
  return Promise.any([
    new Promise((resolve, _reject) => {
      host.previewElm.addEventListener(
        "transitionend",
        () => {
          clearTimeout(timeout);
          resolve({host, error});
        },
        {
          once: true,
        },
      );
      setTimeout(() => (host.showPreview = !host.showPreview));
    }),
    new Promise((resolve, _reject) => {
      timeout = setTimeout(() => {
        host.showPreview = !host.showPreview;
        resolve({
          host,
          error: [
            ...error,
            {
              id_: "__ERROR_CAUSE_ID__",
              message:
                "transitionend-event has not occurred within the timeout",
            },
          ],
        });
      }, 3000);
    }),
  ]);
}

function readTemplateJsonData({host, file, templates, error = []}) {
  return Webapi.File.toText(file)
    .then(({result, file, error: fileReaderError}) => {
      if (fileReaderError) {
        return {error_: fileReaderError};
      } else {
        let data;
        try {
          data = JSON.parse(result);
        } catch (_) {
          return {
            error_: {
              id_: "__ERROR_CAUSE_ID__",
              message: "failed to parse template data json string",
            },
          };
        }
        return Promise.all([
          store.set(Session, {file: file.name}),
          ...Object.values(templates).map((template) =>
            store.set(template.model, data),
          ),
        ])
          .then((_) => ({error_: null}))
          .catch((_) => {
            return {
              error_: {
                id_: "__ERROR_CAUSE_ID__",
                key: "file,...data",
                message: "failed to update session model",
              },
            };
          });
      }
    })
    .then(({error_}) => {
      if (error_) return {host, error: [...error, error_]};
      return {host, error};
    });
}

function handleViewError(host, e) {
  e.stopPropagation();
  if (e.detail.length > 0) {
    host.error = [...host.error, ...e.detail];
  }
}

function handleError(param) {
  if (param.error.length > 0) {
    param.host.error = [...param.host.error, ...param.error];
  }
  return param;
}
