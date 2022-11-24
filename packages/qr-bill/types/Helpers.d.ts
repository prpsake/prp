import {QrBillModel} from "../src";

/**
 * Parse, validate and transform the data for the component.
 *
 * @param {string | Record<string, any>} x - The data.
 * @return {QrBillModel} - The transformed data for the component.
 */
export function jsonToQrBillModel(x: string | Record<string, any>): QrBillModel;
