import * as clipboard from 'clipboardy'
import { decryptItem } from '../itemGeneration/itemEncryption'

// TODO when decrypt fails writeSync() throws an error and crashes the program. This needs to be handled
export function readEmail(email: string) {
    clipboard.writeSync(email)
    console.log('** EMAIL COPIED TO THE CLIPBOARD **')
}

export async function readPassword(masterPassword: string, password: string) {
    const decryptedPassword = await decryptItem(masterPassword, password)
    clipboard.writeSync(decryptedPassword)
    console.log('** PASSWORD COPIED TO THE CLIPBOARD **')
}
