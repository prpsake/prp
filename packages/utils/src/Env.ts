import fs from "fs";
import {loadEnv} from "vite";

export type env = {
  mode: string;
  entries: Record<string, string | boolean>;
  var: (key: string) => string | boolean;
};

export const modes: string[] = fs
  .readdirSync("./")
  .filter((x) => x.startsWith(".env.") && !x.endsWith(".local"))
  .map((x) => x.substring(5))
  .filter((x) => x);

export function envFrom(mode: string, prefixes: string[]): env {
  const entries = loadEnv(mode, process.cwd(), prefixes);
  const fn = (p: string) => (key: string) => entries[`${p}${key}`];

  return prefixes.reduce(
    (a, b) => {
      const prefix = b
        .toLowerCase()
        .replace(/_+([a-z0-9])/g, (_, c) => c.toUpperCase())
        .replace("_", "");

      return {...a, [prefix]: fn(b)};
    },
    {
      mode: mode,
      entries: entries,
      var: fn(prefixes[0]),
    },
  );
}
