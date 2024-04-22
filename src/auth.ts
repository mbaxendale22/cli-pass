import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'

export function encrypt(data: string, key: Buffer) {
    const iv = randomBytes(16)
    const cipher = createCipheriv('aes-256-cbc', key, iv)
    let encrypted = cipher.update(data, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return iv.toString('hex') + ':' + encrypted
}
export function decrypt(encryptedData: string, key: Buffer) {
    try {
        const parts = encryptedData.split(':')
        const iv = Buffer.from(parts.shift(), 'hex')
        const encrypted = parts.join(':')
        const decipher = createDecipheriv('aes-256-cbc', key, iv)
        let decrypted = decipher.update(encrypted, 'hex', 'utf8')
        decrypted += decipher.final('utf8')
        return decrypted
    } catch (err) {
        console.log('decryption failed: ', err.message)
        console.log(
            'This is likely cause by the use of an incorrect master password. Try reloading the program and re-entering your master password'
        )
    }
}

export function passwordIsVerified(password: string) {
    const hasLength = password.length >= 10
    if (!hasLength) return false
    return true
}
