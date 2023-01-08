import {execa, type ExecaChildProcess} from "execa";

type env = {
  mode: string;
  entries: Record<string, string | boolean>;
  var: (key: string) => string | boolean;
} & {
  [key: string]: (key: string) => string | boolean;
};

type killOptions = {
  termination?: NodeJS.Signals;
  forceKillAfterTimeout?: number | boolean;
};

type values = {
  env: env;
  subprocess: ExecaChildProcess<string>;
  kill: (options: killOptions) => void;
  prevValues?: values;
};

type commandStdoutFn = ({
  title,
  content,
  log,
  res,
  rej,
  ...values
}: {
  title?: string;
  content?: string;
  log?: (content: string, cb?: (err?: Error) => void) => void;
  res?: (otherValues?: Record<string, any>) => void;
  rej?: (reason?: any) => void;
} & values) => PromiseLike<Record<string, any>>;

const omitProp = (obj, key) => {
  const {[key]: _, ...rest} = obj;
  return rest;
};

const colors = (color: string): string =>
  ({
    reset: "\u001b[0m",
    black: "\u001b[30m",
    white: "\u001b[37m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    blue: "\u001b[34m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m",
  }[color] || "reset");

export const prependTitleToLine = (line: string, title: string): string =>
  line.replace(/.*?\n/g, `${title}$&`);

export const command =
  ({
    cmd,
    title = cmd,
    color = "reset",
    args,
    stdout,
    wait = true,
    options = {},
  }: {
    cmd: string;
    title?: string;
    color?: string;
    args?: string[] | ((env?: env) => string[]);
    stdout?: boolean | commandStdoutFn;
    wait?: boolean;
    options?: Record<string, any> | ((env?: env) => Record<string, any>);
  }) =>
  (env: env, prevValues: values) => {
    const args_ = typeof args === "function" ? args(env) : args;
    const options_ = typeof options === "function" ? options(env) : options;
    const title_ = `${colors(color)}[${title}]\u001b[0m${" ".repeat(
      Math.max(2, 8 - title.length),
    )}`;

    const subprocess = execa(cmd, args_, {
      env: {FORCE_COLOR: true, ...options_.env},
      ...omitProp(options_, "env"),
    });

    const values: values = {
      env,
      subprocess,
      kill: (options) =>
        !subprocess.killed &&
        subprocess.kill(options.termination || "SIGTERM", {
          forceKillAfterTimeout: 3000,
          ...omitProp(options, "termination"),
        }),
      prevValues,
    };

    if (typeof stdout === "function")
      return new Promise((res, rej) => {
        subprocess.stdout.on("data", (buffer) =>
          stdout({
            title: title_,
            content: buffer.toString(),
            log: (content, cb) => process.stdout.write(content, cb),
            res: (otherValues = {}) => res({...values, ...otherValues}),
            rej,
            ...values,
          }),
        );
      });

    if (Boolean(stdout)) {
      subprocess.stdout.on("data", (buffer) => {
        const content = prependTitleToLine(buffer.toString(), title_);
        process.stdout.write(content);
      });
    }

    if (wait) return subprocess.then(() => values);
    return Promise.resolve(values);
  };
