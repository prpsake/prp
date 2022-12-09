/**
 * ...
 * @param param
 */
export function readFileAsText(param: {e: InputEvent}): Promise<{
  result: string;
  file: File;
}>;
