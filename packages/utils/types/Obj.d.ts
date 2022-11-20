/**
 * ...
 * @param obj
 * @param key
 */
export function omitProp(
  obj: Record<string, any>,
  key: string,
): Record<string, any>;

/**
 * ...
 * @param obj
 * @param mapFn
 */
export function map(
  obj: Record<string, any>,
  mapFn: (param: [string, any]) => [string, any],
): Record<string, any>;

/**
 * ...
 * @param obj
 */
export function isObject(obj: Record<string, any>): boolean;
