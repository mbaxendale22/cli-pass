import { findByIdAndUpdate } from "../db";
import { generatePassword } from "../itemGeneration/generatePassword";
import { encryptItem } from "../itemGeneration/itemEncryption";
import { confirmOrRegenPassword } from "../itemGeneration/newItemForms";

export async function updatePassword(userPassword: string, itemId: number) {
    const newPasswordOpts = { numbers: true, symbols: true };
    const newPasswordLength = 16;
    const newPassword = generatePassword(newPasswordLength, newPasswordOpts);
    const confirmedPassword = confirmOrRegenPassword({
        newPassword,
        newPasswordLength,
        newPasswordOpts,
    });

    //TODO handle this potential error
    const encryptedNewPassword = await encryptItem(
        userPassword,
        confirmedPassword,
    );
    try {
        await findByIdAndUpdate(itemId, encryptedNewPassword);
        console.log("**** PASSWORD UPDATED SUCCESSFULLY ****");
    } catch (err) {
        console.log("xxxx PASSWORD UPDATE FAILED xxxx", err);
    }
}
