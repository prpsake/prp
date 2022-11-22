type t<'a, 'b> = (. 'a) => 'b

let pipe: (. t<'a, 'b>, t<'b, 'c>) => t<'a, 'c> =
	(. f1, f2) =>
	(. x) => f2(. f1(. x))

let pipe3: (. t<'a, 'b>, t<'b, 'c>, t<'c, 'd>) => t<'a, 'd> =
	(. f1, f2, f3) =>
	(. x) => f3(. f2(. f1(. x)))

let pipe4: (. t<'a, 'b>, t<'b, 'c>, t<'c, 'd>, t<'d, 'e>) => t<'a, 'e> =
	(. f1, f2, f3, f4) =>
	(. x) => f4(. f3(. f2(. f1(. x))))
