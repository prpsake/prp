export namespace Cause {
  type Structured = {
    code: string;
    key?: string;
    value?: string;
    message: string;
  };

  function valueToString(value: any): string;
}

export function makeStructured(cause: Cause.Structured): Error;

export function resolveStructured(cause: Cause.Structured): PromiseLike<Error>;
