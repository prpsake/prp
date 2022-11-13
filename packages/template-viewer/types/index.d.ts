import {
  type Model as HybridsModel,
  type UpdateFunctionWithMethods,
  html as hybridsHtml,
  svg as hybridsSvg
} from "hybrids"


import { Data as QrBillData } from "@prpsake/qr-bill";


type PRPModel<M> = {
  qrBill?: QrBillData.Comp | ((data: M) => QrBillData.Comp)
  connect?: Promise<any | void>
}


export type Model<M> = HybridsModel<M> & PRPModel<M>
export type View<M> = ({data}: { data: Omit<M & PRPModel<M>, "connect"> }) => UpdateFunctionWithMethods<any>


type Template<M> = {
  model: Model<M>,
  view: View<M>
}


/**
 * Register the template-viewer custom element with template modules and their styles.
 * Optionally register the qr-bill custom element. The object keys of `param.templates` are used to set up the url
 * paths to the corresponding templates.
 *
 * @example
 * // with required options:
 * import { defineWith } from "@prpsake/template-viewer"
 * import * as estimate from "./templates/estimate"
 * import * as invoice from "./templates/invoice"
 * import style from "./style.css"
 *
 * defineWith({
 *   templates: { estimate, invoice },
 *   style
 * })
 *
 * @example
 * // with all options:
 * import ...
 *
 * defineWith({
 *   templates: { estimate, invoice },
 *   style,
 *   tag: "my-template-viewer",
 *   tagQrBill: "my-qr-bill",
 *   previewSelector: "#my-template-view"
 * })
 *
 * @param {Record<string, Template<unknown>>} param.templates - The template modules.
 * @param {string} param.styles - The styles for the templates.
 * @param {string} [param.tag="template-viewer"] - The tag to be used for the template-viewer custom element.
 * @param {string} [param.tagQrBill="qr-bill"] - The tag to be used for the qr-bill custom element.
 * @param {string} [param.previewSelector="#template-view"] - The selector to be used for the preview element.
 */
export function defineWith(param: {
  templates: Record<string, Template<unknown>>
  style: string
  tag?: string
  tagQrBill?: string
  previewSelector?: string
}): void


/**
 * Define a html template.
 *
 * @example ```
 * import { html } from "@prpsake/template-viewer"
 *
 * const updateFn = ({ prop }) => html`
 *  <p>${prop}</p>
 * `
 * ```
 *
 * @function html
 * @param {TemplateStringsArray} parts
 * @param {...unknown} args
 * @return {UpdateFunctionWithMethods<E>}
 */
export const html: typeof hybridsHtml


/**
 * Define a svg template. Use the svg tag function for svg child elements with dynamic content.
 *
 * @example ```
 * import { html, svg } from "@prpsake/template-viewer"
 *
 * const updateFn = ({ prop }) => html`
 *  <svg>
 *    ${svg`
 *      <text>${prop}</text>
 *    `}
 *  </svg>
 * `
 * ```
 *
 * @function svg
 * @param {TemplateStringsArray} parts
 * @param {...unknown} args
 * @return {UpdateFunctionWithMethods<E>}
 */
export const svg: typeof hybridsSvg


export * from "@prpsake/qr-bill"
