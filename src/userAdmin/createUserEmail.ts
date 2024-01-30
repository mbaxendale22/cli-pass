import { deleteStoredEmail, getUserEmails, storeNewUserEmail } from "../db/user_emails";
import { createNewFormField, myPrompt } from "../utils";

export async function displayCurrentUserEmails() {
    const currentUserEmails = await getUserEmails();

    if (!currentUserEmails.length) {
        console.log("You currently have no saved emails!");
        return;
    }
    console.log("Here are your currently saved emails:\n");
    for (const item of currentUserEmails) {
        console.log(`***** id: ${item.id}, email: ${item.email} *****`);
    }
}

async function createUserEmail() {
    const newEmail = createNewFormField(
        "Please enter a new email you would like to save: ",
    );
    await storeNewUserEmail(newEmail);
    console.log("***** New Email Stored Successfully ***** ");
}

async function deleteUserEmail() {
    await displayCurrentUserEmails();
    const emailId = createNewFormField(
        "Please enter the id of the email you would like to delete: ",
    );
    console.log(
        "Are you sure you want to delete this item? Deletion cannot be undone",
    );
    const userOpt = myPrompt("Choose Y or n: ").toUpperCase();
    if (userOpt !== "Y") {
        return;
    }
    await deleteStoredEmail(parseInt(emailId));
    console.log("** EMAIL DELETED **");
    return;
}

export async function handleUserEmails() {
    await displayCurrentUserEmails();
    console.log(
        "What would you like to do? \n\n1) Create new saved email \n2) delete a currently saved email?\n)3 Go back to main menu\n",
    );
    const userSelection = myPrompt("Please select: ");
    if (userSelection === "3") {
        return;
    }
    if (userSelection === "1") {
        await createUserEmail();
        return;
    }
    await deleteUserEmail();
}
