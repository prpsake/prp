export namespace Cause {
  type Structured = {
    code: string;
    message: string;
    operational: boolean;
    value?: string;
  };

  type Caught = {
    name: string;
    message: string;
    fileName?: string;
    lineNumber?: number;
    columnNumber?: number;
    stack?: string;
  };

  function valueToString(value: any): string;
}

export function makeStructured(cause: Cause.Structured): Error;
export function makeCaught(cause: Cause.Caught): Error;
export function resolveStructured(cause: Cause.Structured): PromiseLike<Error>;
export function resolveCaught(cause: Cause.Caught): PromiseLike<Error>;
