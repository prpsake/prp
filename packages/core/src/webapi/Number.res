type t

@scope("Number") @val external isNaN: t => bool = "isNaN"

let isNumber: 'a => bool = x => !isNaN(x)
