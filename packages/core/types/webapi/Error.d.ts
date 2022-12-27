export namespace Cause {
  type Structured = {
    id: string;
    code: string;
    key?: string;
    value?: string;
    message: string;
    operational: boolean;
  };

  function valueToString(value: any): string;
}

export function makeStructured(cause: Cause.Structured): Error;

export function resolveStructured(cause: Cause.Structured): PromiseLike<Error>;
