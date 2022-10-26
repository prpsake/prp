import type { UpdateFunctionWithMethods } from "hybrids"
import type { InputData, QRControlData, QRData } from "@prpsake/qr-bill"


type Data = Record<string, any> | InputData
type TemplateData = Data extends InputData ? Data & QRData & QRControlData : Data


type Template = {
  model: Data
  content: (data: TemplateData) => UpdateFunctionWithMethods<any>
}


export function defineWith(param: {
  templates: Record<string, Template>
  styles: string
  tag?: string
  tagQR?: string
  previewSelector?: string
}): void
