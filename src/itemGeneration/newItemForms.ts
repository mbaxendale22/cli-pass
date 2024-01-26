import { NewItemData, NewItemInput } from "../@types/customTypes"
import { storeNewItem } from "../db"
import { createNewFormField } from "../utils"
import { generatePassword } from "./generatePassword"
import { encryptItem } from "./itemEncryption"

async function createNewItemData(userPassword: string, newItemInput: NewItemInput) {
    const { name, email, url, notes } = newItemInput
    const newPasswordOpts = { numbers: true, symbols: true }
    const newPasswordLength = 16
    const newPassword = generatePassword(newPasswordLength, newPasswordOpts)

    //TODO handle this potential error
    const encryptedNewPassword = await encryptItem(userPassword, newPassword)

    const newItem: NewItemData = {
        name,
        email,
        password: encryptedNewPassword,
        url,
        notes,
    }

    return newItem
}

function newItemForm() {
    const name = createNewFormField("What would you like to name this item?: ")
    const email = createNewFormField("What email would you like to use for this item?: ")
    const url = createNewFormField("If you would like to store a URL for the item, enter it here (hit enter to leave blank): ")
    const notes = createNewFormField("If you would like to store any notes for the item, enter them here (hit enter to leave blank): ")
    const newItem = { name, email, url, notes }
    return newItem
}

/**
 * Walks the user through creating a new item. Generates a new password to attach to the item. 
 * Stores the new item in the database.
 * 
 * @param {string} active_master_password - The user's password used for deriving the decryption key.
 * 
 */
export async function createNewItem(active_master_password: string) {
    const newItemData = newItemForm()
    const newItem = await createNewItemData(active_master_password, newItemData)
    await storeNewItem(newItem)
}
