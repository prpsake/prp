let invalidIbanChecksum = res => "fails on the checksum: expected 1 but got " ++ res
let invalidQrrCheckDigit = res => exp => "fails on the check digit: expected " ++ exp ++ " but got " ++ res
let invalidCharLenExact = exp => "must be " ++ exp ++ " characters long"
let invalidCharLenMax = exp => "must be at most " ++ exp ++ " characters long"
let invalidCharLenMinMax = expMin => expMax => "must be " ++ expMin ++ " to " ++ expMax ++ " characters long"
let invalidReference = "fails as no reference type could be determined for a non-empty reference value"
