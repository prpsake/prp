import {html} from "../../index.js";

export const model = {
  title: "",
  language: "",
  foo: "",
};

export const view = ({data}) => html` <div>${data.foo}</div> `;
