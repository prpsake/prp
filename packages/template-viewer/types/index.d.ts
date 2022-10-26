import { Storage, Model as HybridsModel } from "hybrids"


export type Model<M> = HybridsModel<M> & {
  connect?: Storage<M>["get"]
}

export { defineWith } from "./App"
export { html, svg } from "hybrids"
export { Helpers } from "@prpsake/qr-bill"
