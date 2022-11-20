export type QRCodeOptions = {
  ecl: "L" | "M" | "Q" | "H";
  width: number;
  height: number;
  padding: number;
};

export function pathDataFromString(
  content: string,
  options: QRCodeOptions,
): string;
