import {Cause} from "./Error";

export function getFile(e: InputEvent): Promise<{
  file: File | null;
  error?: Cause.Structured;
}>;
