import {
    ConfirmOrRegenOpts,
    NewItemData,
    NewItemInput,
} from "../@types/customTypes";
import { storeNewItem } from "../db/items";
import { getUserEmails } from "../db/user_emails";
import { createNewFormField, myPrompt } from "../utils";
import { generatePassword } from "./generatePassword";
import { encryptItem } from "./itemEncryption";

export function createPasswordText() {
    const newPasswordOpts = { numbers: true, symbols: true };
    const newPasswordLength = 16;
    let confirmedPassword = "";

    console.log(
        "Would you like to generate a new password or enter one manually?",
    );
    const response = myPrompt("Press 1 to generate or 2 to enter manually: ");

    if (response === "2") {
        confirmedPassword = createNewFormField("Enter your new password: ");
    } else {
        const newPassword = generatePassword(newPasswordLength, newPasswordOpts);
        confirmedPassword = confirmOrRegenPassword({
            newPassword,
            newPasswordLength,
            newPasswordOpts,
        });
    }
    return confirmedPassword;
}

export function confirmOrRegenPassword(opts: ConfirmOrRegenOpts): string {
    let confirm = false;
    let confirmedPassword = opts.newPassword;
    while (!confirm) {
        console.log("Here is your new password: ", confirmedPassword);
        const response = myPrompt("Enter 1 to confirm or 2 to regenerate: ");
        if (response === "2") {
            confirmedPassword = generatePassword(
                opts.newPasswordLength,
                opts.newPasswordOpts,
            );
            continue;
        }
        confirm = true;
        return confirmedPassword;
    }
}

async function createNewItemData(
    userPassword: string,
    newItemInput: NewItemInput,
) {
    const { name, email, url, notes } = newItemInput;

    const newPasswordText = createPasswordText();
    //TODO handle this potential error
    const encryptedNewPassword = await encryptItem(userPassword, newPasswordText);

    const newItem: NewItemData = {
        name,
        email,
        password: encryptedNewPassword,
        url,
        notes,
    };

    return newItem;
}

async function selectEmail() {
    let email = "";

    const userEmails = await getUserEmails();
    console.log("Would you like to:\n1) use a saved email\n2) enter a new one?");
    const createNewEmail = myPrompt("Please enter your choice: ");
    if (createNewEmail === "2") {
        email = createNewFormField("Please enter an email for this item?: ");
        return email;
    }
    if (!userEmails.length) {
        console.log("You currently have no saved emails!");
        email = createNewFormField("Please enter an email for this item?: ");
        return email;
    }
    console.log("Here are your currently saved emails:\n");
    for (const item of userEmails) {
        console.log(`***** id: ${item.id}, email: ${item.email} *****`);
    }
    const emailId = parseInt(
        myPrompt("Enter the id of the id you would like to use: "),
    );

    return userEmails.find((email) => email.id === emailId).email;
}

async function newItemForm() {
    const name = createNewFormField("What would you like to name this item?: ");

    const email = await selectEmail();

    const url = createNewFormField(
        "\nIf you would like to store a URL for the item, enter it here (hit enter to leave blank): ",
    );
    const notes = createNewFormField(
        "\nIf you would like to store any notes for the item, enter them here (hit enter to leave blank): ",
    );
    const newItem = { name, email, url, notes };
    return newItem;
}

/**
 * Walks the user through creating a new item. Generates a new password to attach to the item.
 * Stores the new item in the database.
 *
 * @param {string} active_master_password - The user's password used for deriving the decryption key.
 *
 */
export async function createNewItem(active_master_password: string) {
    const newItemData = await newItemForm();
    const newItem = await createNewItemData(active_master_password, newItemData);
    await storeNewItem(newItem);
    console.log("**** NEW PASSWORD CREATED AND SAVED **** \n");
}

