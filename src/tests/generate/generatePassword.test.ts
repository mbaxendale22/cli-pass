import { generatePassword } from '../../itemGeneration/generatePassword'

describe('generatePassword', () => {
    it('should generate a password of the correct length', () => {
        const length = 10;
        const password = generatePassword(length, { numbers: false, symbols: false });
        expect(password).toHaveLength(length);
    });

    it('should include numbers if requested', () => {
        const password = generatePassword(10, { numbers: true, symbols: false });
        expect(password).toMatch(/[0-9]/);
    });

    it('should include at least one number', () => {
        const password = generatePassword(10, { numbers: true, symbols: false });
        expect(password.split('').some(char => '0123456789'.includes(char))).toBeTruthy();
    });

    it('should not include symbols if not requested', () => {
        const password = generatePassword(10, { numbers: false, symbols: false });
        expect(password).not.toMatch(/[!@#$%^&*_+~|;?,.-=]/);
    });

    it('should include symbols if requested', () => {
        const password = generatePassword(10, { numbers: false, symbols: true });
        expect(password).toMatch(/[!@#$%^&*_+~|;?,.-=]/);
    });

    it('should not have more than 3 symbols', () => {
        const password = generatePassword(10, { numbers: false, symbols: true });
        const symbolCount = password.split('').filter(char => '!@#$%^&*_+~|;?,.-='.includes(char)).length;
        expect(symbolCount).toBeLessThanOrEqual(3);
    });

    it('should return an empty string for zero length', () => {
        const password = generatePassword(0, { numbers: true, symbols: true });
        expect(password).toBe('');
    });

    it('handles negative length input', () => {
        const password = generatePassword(-1, { numbers: true, symbols: true });
        expect(password).toBe('');
    });

});

