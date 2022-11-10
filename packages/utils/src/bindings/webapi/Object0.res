type t<'k, 'v>


@scope("Object") @val external fromEntries: array<('k, 'v)> => t<'k, 'v> = "fromEntries"
@scope("Object") @val external entries: t<'k, 'v> => array<('k, 'v)> = "entries"
@scope("Object") @val external is: ('a, 'b) => bool = "is"

@send external toString: 'a => string = "toString"
