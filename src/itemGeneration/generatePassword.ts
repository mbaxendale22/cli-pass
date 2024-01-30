/**
 * Generates a random password.
 * If options are selected, password will contain at least one number and at most three symbols
 * @param length Length of the password.
 * @param options Object containing flags for including numbers, symbols, etc.
 * @returns Randomly generated password.
 */
export function generatePassword(length: number, options: { numbers: boolean; symbols: boolean }): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*_+~|;?,.-='
    let symCount = 0
    let numCount = 0
    let characters = alphabet;
    if (options.numbers) characters += numbers;
    if (options.symbols) characters += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        let newChar = characters[randomIndex];
        const maxSymCountReached = symbols.includes(newChar) && symCount >= 3;

        // ensure there is at least 1 number in the password
        if (options.numbers && numCount < 1) {
            randomIndex = Math.floor(Math.random() * numbers.length)
            newChar = numbers[randomIndex]
            numCount++
        }

        // ensure there are no more than 3 symbols in the password
        if (maxSymCountReached) {
            i--
            continue
        }
        if (symbols.includes(newChar)) {
            symCount += 1

        }
        password += newChar
    }

    return password;
}
