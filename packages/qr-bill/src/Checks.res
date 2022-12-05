type fn = (. unit) => string
type fn1 = (string) => fn
type fn2 = (string, string) => fn
type fnN = (array<string>) => fn

let invalidChecksum: fn2 = (res, exp) => (.) => "fails on the checksum: expected " ++ exp ++ " but got " ++ res
let invalidCheckDigit: fn2 = (res, exp) => (.) => "fails on the check digit: expected " ++ exp ++ " but got " ++ res
let invalidCharLenExact: fn1 = (exp) => (.) => "must be " ++ exp ++ " characters long"
let invalidCharLenMax: fn1 = (exp) => (.) => "must be at most " ++ exp ++ " characters long"
let invalidCharLenMinMax: fn2 = (expMin, expMax) => (.) => "must be " ++ expMin ++ " to " ++ expMax ++ " characters long"
let invalidReference: fn = (.) => "fails as no reference type could be determined for a non-empty reference value"
let invalidOption: fnN = (expOpts) => (.) => "must be one of " ++ Js.Array2.joinWith(expOpts, ", ")
let invalidNumberRange: fn2 = (expMin, expMax) => (.) => "must be a number ranging from" ++ expMin ++ " to " ++ expMax
let invalidIbanFormat: fn = (.) => "must start with countryCode CH or LI followed by 19 digits"
