export function readFileAsText(e: InputEvent): Promise<{
  result: string;
  file: File | null;
  error?: Error;
}>;
