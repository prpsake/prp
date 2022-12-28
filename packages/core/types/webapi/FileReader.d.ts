import {Cause} from "./Error";

export function readFileAsText(e: InputEvent): Promise<{
  result: string;
  file: File | null;
  error?: Cause.Structured;
}>;
