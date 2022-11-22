/**
 * ...
 * @param param
 */
export function readFileAsText(param: {
  e: InputEvent;
  onLoad: (param: {result: string; file: File}) => void;
}): void;
