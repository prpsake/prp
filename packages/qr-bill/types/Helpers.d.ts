import {Data, QrBillModel} from "../src";

type QrBillCode = {
  data: Data.Comp;
  svg: string;
};

/**
 * Parse, validate and transform the data for the component.
 *
 * @param {string | Record<string, any>} x - The data.
 * @return {QrBillModel} - The transformed data for the component.
 */
export function jsonToQrBillModel(x: string | Record<string, any>): QrBillModel;

export function jsonToQrBillCode(x: string | Record<string, any>): QrBillCode;
