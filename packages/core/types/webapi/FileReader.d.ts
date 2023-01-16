import {Cause} from "./Error";

export function readFileAsText(file: File): Promise<{
  result: string;
  file: File | null;
  error?: Cause.Structured;
}>;
