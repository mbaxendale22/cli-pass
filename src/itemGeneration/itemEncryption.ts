import { pbkdf2Sync } from "crypto";
import { decrypt, encrypt } from "../auth";
import { getUser } from "../db/user";

/**
 * Encrypts a new item's password using the user's password. It retrieves encryption
 * parameters such as salt, iterations, key length, and digest algorithm from the user's data.
 * Then it generates a derived key using PBKDF2 and encrypts the new item's password.
 * 
 * @param {string} userPassword - The user's password used for deriving the encryption key.
 * @param {string} dataToEncrypt - The data to be encrypted
 * @returns {Promise<string>} A promise that resolves with the encrypted password of the new item.
 * 
 */
export async function encryptItem(userPassword: string, dataToEncrypt: string) {
    const { salt, iterations, keyLength, digest } = await getUser()

    const derivedKey = pbkdf2Sync(userPassword, salt, iterations, keyLength, digest);
    const encrytedItemPassword = encrypt(dataToEncrypt, derivedKey)
    return encrytedItemPassword
}
/**
 * Decrypts an encrypted item's password using the user's password. Similar to the encryption
 * process, it uses the user's details to get parameters for the decryption process. 
 * It generates a derived key with PBKDF2 and then decrypts the encrypted item's password.
 * 
 * @param {string} userPassword - The user's password used for deriving the decryption key.
 * @param {string} encryptedData - The dato to be decrypted
 * @returns {Promise<string>} A promise that resolves with the decrypted password of the item.
 * 
 */
export async function decryptItem(userPassword: string, encryptedData: string) {
    const { salt, iterations, keyLength, digest } = await getUser()

    const derivedKey = pbkdf2Sync(userPassword, salt, iterations, keyLength, digest);
    const decryptedItemPassword = decrypt(encryptedData, derivedKey)
    return decryptedItemPassword
}
