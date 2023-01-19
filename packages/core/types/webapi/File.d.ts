import {Cause} from "./Error";

export function toText(file: File): Promise<{
  result: string;
  file: File | null;
  error?: Cause.Structured;
}>;
