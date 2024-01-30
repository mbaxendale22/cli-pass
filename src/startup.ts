import { passwordIsVerified } from "./auth"
import { createNewFormField, myPrompt } from "./utils"
import { randomBytes } from "crypto";
import { createItemsTable, createUserEmailsTable, createUserTable } from "./db/create_tables";
import { getUser, storeNewUser, userTableExists } from "./db/user";
import { itemsTableExists } from "./db/items";

function passwordMatches(password1: string, password2: string) {
    return password1 === password2
}

function createMasterPassword() {
    console.log("In order to continue you'll need to make master password")

    let pwd = myPrompt("Please enter a master password: ")
    while (!passwordIsVerified(pwd)) {
        console.log("That password is not strong enough have another go\n")
        pwd = myPrompt("Please enter a master password: ")
    }
    let pwdConfirmation = myPrompt("Please reenter master password: ")
    while (!passwordMatches(pwd, pwdConfirmation)) {
        console.log("those passwords don't match, please try again")
        pwdConfirmation = myPrompt("Please reenter a master password: ")

    }
    console.log("You're all set! Don't forget your password. Your data will be unrecoverable if you do!")
    return pwd
}


// 0 = false, 1 = true
type MasterPasswordOpts = 0 | 1
const saltLength = 16; // Salt length

const generateSalt = () => {
    return randomBytes(saltLength).toString('hex');
}

async function createNewUser(username: string, hasMasterPassword: MasterPasswordOpts) {
    const keyLength = 32 // for AES-256
    const iterations = 100000
    const digest = 'sha512'
    const salt = generateSalt()

    const newUserData = { username, salt, keyLength, iterations, digest, hasMasterPassword }

    await storeNewUser(newUserData)

}

async function performFirstTimeUserSetup() {

    const username = createNewFormField("Please create a username: ")
    const userMasterPassword = createMasterPassword()

    // TODO Error handling 
    await createUserTable()
    await createItemsTable()
    await createUserEmailsTable()

    return { username, userMasterPassword }
}
async function isExistingUser() {
    const x = await userTableExists()
    const y = await itemsTableExists()

    return x && y ? true : false
}

/**
 * Initializes the application for either a first-time or returning user.
 * If the user is new, the function guides them through a setup process, 
 * including creating a username and master password. For returning users, 
 * it checks if a master password exists and, if not, prompts the user to create one. 
 * Finally, it asks for the user's existing master password.
 *
 * Note: due to the encryption method used, the validity of the user's existing password
 * cannot be checked at this stage. Only when a user attempts to access an item will the 
 * process fail or succeed based on their master password
 *
 * @returns {Promise<string>} A promise that resolves with the active master password.
 * 
 */
export async function initApp(): Promise<string> {

    let user_password: string;
    const firstTimeUser = await isExistingUser()
    if (!firstTimeUser) {
        console.log("Hello! It looks like this is your first time using CLI PASS")
        const { username, userMasterPassword } = await performFirstTimeUserSetup()
        user_password = userMasterPassword
        await createNewUser(username, 1)
    }
    else {
        const user = await getUser()
        if (user.hasMasterPassword === 0) {
            console.log("it looks like you havent yet created a master password")
            user_password = createMasterPassword()
        }
        user_password = createNewFormField("Welcome back! Please enter your master password: ")
    }
    return user_password
}


