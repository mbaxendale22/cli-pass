import { findByIdAndUpdate } from "../db/items";
import { encryptItem } from "../itemGeneration/itemEncryption";
import { createPasswordText } from "../itemGeneration/newItemForms";
export async function updatePassword(userPassword: string, itemId: number) {

    const newPasswordText = createPasswordText();
    //TODO handle this potential error
    const encryptedNewPassword = await encryptItem(
        userPassword,
        newPasswordText,
    );
    try {
        await findByIdAndUpdate(itemId, encryptedNewPassword);
        console.log("**** PASSWORD UPDATED SUCCESSFULLY ****");
    } catch (err) {
        console.log("xxxx PASSWORD UPDATE FAILED xxxx", err);
    }
}
