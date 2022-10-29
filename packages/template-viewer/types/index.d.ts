import {
  type Model as HybridsModel,
  type UpdateFunctionWithMethods,
  type html as HybridsHtml,
  type svg as HybridsSvg
} from "hybrids"
import type {QRBill, QRBillControl} from "@prpsake/qr-bill";


type PRPModel<M> = {
  qr?: QRBill & QRBillControl | ((data: M) => QRBill & QRBillControl)
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
 * import styles from "./index.css"
 *
 * defineWith({
 *   templates: { estimate, invoice },
 *   styles
 * })
 *
 * @example
 * // with all options:
 * import ...
 *
 * defineWith({
 *   templates: { estimate, invoice },
 *   styles,
 *   tag: "my-template-viewer",
 *   tagQR: "my-qr-bill",
 *   previewSelector: "#my-template-view"
 * })
 *
 * @param {Record<string, Template<unknown>>} param.templates - The template modules.
 * @param {string} param.styles - The styles for the templates.
 * @param {string} [param.tag="template-viewer"] - The tag to be used for the template-viewer custom element.
 * @param {string} [param.tagQR="qr-bill"] - The tag to be used for the qr-bill custom element.
 * @param {string} [param.previewSelector="#template-view"] - The selector to be used for the preview element.
 */
export function defineWith(param: {
  templates: Record<string, Template<unknown>>
  styles: string
  tag?: string
  tagQR?: string
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
 * @returns {UpdateFunctionWithMethods<E>}
 */
export const html: HybridsHtml


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
 * @returns {UpdateFunctionWithMethods<E>}
 */
export const svg: HybridsSvg



export {Helpers} from "@prpsake/qr-bill"
