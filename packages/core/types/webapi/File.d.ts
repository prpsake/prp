import {Cause} from "./Error";

export function toText(file: Blob): Promise<{
  result?: string;
  file?: Blob;
  error?: Cause.Structured;
}>;
