import {html} from "../../index.js";
export {model} from "./baz.js";

export const view = ({data}) => html` <div>${data.foo}</div> `;
