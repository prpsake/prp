import {
  type Model as HybridsModel,
  type Component as HybridsComponent,
  type UpdateFunctionWithMethods,
  html as hybridsHtml,
  svg as hybridsSvg,
} from "hybrids";

import {Cause} from "@prpsake/core/types/webapi/Error";
import {QrBillModel} from "@prpsake/qr-bill";

type PRPModel<M> = {
  qrBill?: QrBillModel | ((data: M) => QrBillModel);
};

type SessionPartialModel = {
  file: string;
  language: string;
  title: string;
  viewVertical: boolean;
};

export type Model<M> = HybridsModel<M> & PRPModel<M>;
export type View<M> = ({
  data,
  session,
}: {
  data: M & PRPModel<M>;
  session: HybridsModel<SessionPartialModel>;
}) => UpdateFunctionWithMethods<any>;

type Template<M> = {
  model: Model<M>;
  view: View<M>;
};

/**
 * @typedef {{
 *   get: <M>(_: {id: string | number}) => PromiseLike<M>,
 *   list: <M>(_: {offset: number, limit, number}) => PromiseLike<M>
 * }} api
 */

/**
 * Register the template-viewer custom element with template modules and their
 * styles. Optionally register the qr-bill custom element. The object keys of
 * `param.templates` are used to set up the url paths to the corresponding
 * templates.
 *
 * @example
 * // with required options:
 * import {defineWith} from "@prpsake/template-viewer"
 * import * as estimate from "./templates/estimate"
 * import * as invoice from "./templates/invoice"
 * import style from "./style.css"
 *
 * defineWith({
 *   templates: {estimate, invoice},
 *   style
 * })
 *
 * @example
 * // with all options:
 * import ...
 *
 * defineWith({
 *   templates: {estimate, invoice},
 *   style,
 *   tag: "my-template-viewer",
 *   tagQrBill: "my-qr-bill",
 *   onError: ({error}) => error.forEach(console.log)
 * })
 *
 * @param param
 * @param {Record<string, Template<unknown>>} param.templates - The template
 *   modules.
 * @param {string} param.styles - The styles for the templates.
 * @param {string} [param.tag="template-viewer"] - The tag to be used for the
 *   template-viewer custom element.
 * @param {string|boolean} [param.tagQrBill] - The tag to be used for the
 * qr-bill custom element or true for `qr-bill` or any falsy value, which
 * means that the qr-bill component won't be used.
 * @param {{
 *   get: <M>(_: {id: string | number}) => PromiseLike<M>,
 *   list: <M>(_: {offset: number, limit: number}) => PromiseLike<M>
 * }} param.api
 * @param {(param: {host: HybridsComponent<unknown>, error:
 *   Cause.Structured[]}) => void} [param.onError=console.log] - The function
 *   handling errors
 */
export function defineWith(param: {
  templates: Record<string, Template<unknown>>;
  style: string;
  tag?: string;
  tagQrBill?: string | boolean;
  api: {
    idKey: string;
    get: <M>({id}: {id: string | number}) => PromiseLike<M>;
    list: <M>({
      offset,
      limit,
    }: {
      offset?: number;
      limit?: number;
    }) => PromiseLike<M>;
  };
  onError?: ({
    host,
    error,
  }: {
    host: HybridsComponent<unknown>;
    error: Cause.Structured[];
  }) => void;
}): Promise<HybridsComponent<unknown>>;

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
export const html: typeof hybridsHtml;

/**
 * Define a svg template. Use the svg tag function for svg child elements with
 * dynamic content.
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
export const svg: typeof hybridsSvg;

export * from "@prpsake/qr-bill";
