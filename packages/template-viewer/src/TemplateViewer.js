import styleApp from "./style.css";
import {store, define, router, html} from "hybrids";
import {QrBill} from "@prpsake/qr-bill";
import {BlobReader} from "@prpsake/utils";
import {preview} from "./Paginator.js";
import {modelsFromTemplates, viewsFromTemplates} from './Helpers';
import Session from "./Session.js";

if (import.meta.env.EXP_ROUTER_DEBUG) router.debug();
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    if (import.meta.env.EXP_HMR_FORCE_RELOAD) {
      import.meta.hot.invalidate();
    }
  });
}


const TemplateViewer = ({pages, baseUrl = "", onFileInput, onFileDrop}) => ({
  session: store(Session),
  previewElm: {
    value: undefined,
    connect: (host, key) => {
      new MutationObserver((mutations) => {
        for (const mutation of mutations)
          if (mutation.addedNodes[0]?.tagName?.startsWith("VIEW-")) {
            host[key] = host.querySelector(".template-view");
            preview({host});
            break;
          }
      }).observe(host, {subtree: true, childList: true});
    },
  },
  view: router(pages, {url: `/${baseUrl}`}),
  content: ({session, view}) =>
    html`
      <div class="hidden view">${view}</div>

      <div
        class=${[
          "template-view",
          "relative",
          "overscroll-x-contain",
          "opacity-100",
          "transition-opacity",
          "duration-300",
          session.viewVertical ? "" : "preview-sm",
        ]}
        ondragover=${(e) => e.preventDefault()}
        ondrop=${onFileDrop}
      ></div>

      <aside class="fixed bottom-0 right-0 p-8 w-96 font-sans text-system-fg prp-template-viewer-app">
        <div class="flex flex-col items-end">
          <div>
            <ul class="text-right">
              ${pages.map(
                (page) => html`
                  <li class="mb-2">
                    <a
                      class="inline-block px-2 py-1 drop-shadow-sm rounded-md bg-action-bg hover:bg-action-hover-bg font-light text-sm text-gray-200 select-none"
                      href="${router.url(page)}"
                      >${page[router.connect].url.substring(1)}</a
                    >
                  </li>
                `,
              )}
            </ul>
          </div>
          <div class="mb-2">
            <button
              class="flex w-11 h-11 p-3 drop-shadow-sm rounded-md bg-action-bg hover:bg-action-hover-bg"
              type="button"
              onclick=${toggleMode}
            >
              <div class="w-full h-full text-gray-200">
                <svg
                  class=${{
                    block: true,
                    "fill-current": true,
                    "rotate-90": !session.viewVertical,
                  }}
                  width="100%"
                  height="100%"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"
                  />
                </svg>
              </div>
            </button>
          </div>
          <div>
            <input
              class="hidden"
              type="file"
              id="control-file"
              name="file"
              accept="application/json"
              onchange=${onFileInput}
            />
            <label
              class="flex justify-between w-11 h-11 drop-shadow-sm bg-action-bg hover:bg-action-hover-bg rounded-md text-gray-200 cursor-pointer select-none"
              for="control-file"
            >
              <div class="w-0 overflow-hidden opacity-0 flex-auto font-light text-sm truncate onhover-show">
                ${session.title}
              </div>
              <div class="w-11 w-11 p-3 text-gray-200">
                <svg class="block fill-current" width="100%" height="100%" viewBox="0 0 512 512">
                  <path
                    d="M128 64c0-35.3 28.7-64 64-64H352V128c0 17.7 14.3 32 32 32H512V448c0 35.3-28.7 64-64 64H192c-35.3 0-64-28.7-64-64V336H302.1l-39 39c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l80-80c9.4-9.4 9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l39 39H128V64zm0 224v48H24c-13.3 0-24-10.7-24-24s10.7-24 24-24H128zM512 128H384V0L512 128z"
                  />
                </svg>
              </div>
            </label>
          </div>
        </div>
      </aside>
    `.style(styleApp),
});

export function defineWith({templates, style, tag = "template-viewer", tagQrBill = "qr-bill"}) {
  if (typeof tagQrBill === "string") {
    define({
      ...QrBill,
      tag: tagQrBill,
      class: "absolute bottom-0 left-0",
    });
  }

  store.set(Session, {style}).then(() => {
    const templatesConnected = modelsFromTemplates({templates});

    define({
      tag,
      ...TemplateViewer({
        baseUrl: Object.keys(templates)[0],
        pages: viewsFromTemplates({templates: templatesConnected}),
        onFileInput: onFileInputFn({templates: templatesConnected}),
        onFileDrop: onFileDropFn({templates: templatesConnected}),
      }),
    });
  });
}

function onFileDropFn({templates}) {
  return function onFileDrop(host, e) {
    e.preventDefault();
    readTemplateJsonData({host, e, templates});
  };
}

function onFileInputFn({templates}) {
  return function onFileInput(host, e) {
    readTemplateJsonData({host, e, templates});
  };
}

function toggleMode(host, _e) {
  const {viewVertical} = store.get(Session);
  store.set(Session, {viewVertical: !viewVertical}).then((session) => {
    host.previewElm.classList.toggle("preview-sm", !session.viewVertical);
  });
}

function readTemplateJsonData({host, e, templates}) {
  BlobReader.readFileAsText({
    e,
    onLoad: ({result, file}) => {
      try {
        const data = JSON.parse(result);
        store.set(Session, {file: file.name}).then(() => {
          const templateName = router.currentUrl().pathname.substring(1);
          store.set(templates[templateName].model, data).then(() => preview({host}));
        });
      } catch (e) {
        console.log(e);
      }
    },
  });
}
