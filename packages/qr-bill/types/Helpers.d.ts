import {Comp} from "./Data";


/**
 * Parse, validate and transform the data for the component.
 *
 * @param {string | Record<string, any>} x - The data.
 * @return {Comp} - The transformed data for the component.
 */
export function compFromJson(x: string | Record<string, any>): Comp
