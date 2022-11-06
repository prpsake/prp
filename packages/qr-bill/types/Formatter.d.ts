/**
 * Remove whitespace from a string.
 *
 * @param {string} str - A string
 * @return {string} - The string without whitespace
 */
export function removeWhitespace(str: string): string


/**
 * Format a string into space-separated groups of maximal 3 visible chars from the left.
 *
 * @example ```
 * block3("123456789") // "123 456 789"
 * block3(" four five   six ") // "fou rfi ves ix"
 * ```
 *
 * @param {string} str - A string.
 * @return {string} - The string without whitespace.
 */
export function blockStr3(str: string): string


/**
 * Format a string into space-separated groups of maximal 4 visible chars from the left.
 *
 * @example ```
 * block4("123456789012") // "1234 5678 9012"
 * block4(" four five   six seven ") // "four five sixs even"
 * ```
 *
 * @param {string} str - A string.
 * @return {string} - The formatted string.
 */
export function blockStr4(str: string): string


/**
 * Format a string into space-separated groups of maximal 5 visible chars from the left.
 *
 * @example ```
 * block5("1234567890") // "12345 67890"
 * block5(" four five   six seven ") // "fourf ivesi xseve n"
 * ```
 *
 * @param {string} str - A string.
 * @return {string} - The formatted string.
 */
export function blockStr5(str: string): string


export function referenceBlockStr(str: string): string


export function moneyFromNumberStr2(str: string): string

