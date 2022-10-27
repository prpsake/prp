import type {Model as HybridsModel, UpdateFunctionWithMethods} from "hybrids"
import type {QRBill, QRBillControl} from "@prpsake/qr-bill";


type PRPModel<M> = {
  qr?: QRBill & QRBillControl | ((data: M) => QRBill & QRBillControl)
  connect?: Promise<any | void>
}


export type Model<M> = HybridsModel<M> & PRPModel<M>
export type View<M> = ({ data }: { data: Omit<M & PRPModel<M>, "connect"> }) => UpdateFunctionWithMethods<any>


type Template<M> = {
  model: Model<M>,
  view: View<M>
}


export function defineWith(param: {
  templates: Record<string, Template<unknown>>
  styles: string
  tag?: string
  tagQR?: string
  previewSelector?: string
}): void

export { html, svg } from "hybrids"
export { Helpers } from "@prpsake/qr-bill"
