type generatorResult<'a> = {
  value: 'a,
  done: bool
}

type generator<'a> = {
  next: unit => generatorResult<'a>
}

let intStr: (string, int) => generator<string> = %raw(`
  function* sequenceInt(prefix = "", n = 0) {
    do {
      yield prefix + String(n++);
    } while (n);
  }
`)
