import { Item } from "../@types/customTypes";
import { DBStatus, myPrompt } from "../utils";
import { handleDeleteItem } from "./deleteItem";
import { readEmail, readPassword } from "./readItem";
import { updatePassword } from "./updateItem";

export async function rudMenu(item: Item, masterPassword: string) {
    console.log("\n******* FOUND PASSWORD ******\n");
    console.log(
        `id: ${item.id}, name: ${item.name}, email: ${item.email}`,
    );

    let userSelection: string;
    let deleteStatus: string;
    let exit = false;

    while (!exit) {
        console.log(
            "\nWhat would you like to do?\n1) Copy email\n2) Copy password\n",
        );
        console.log(
            "3) Update this item\n4) Delete this item\n\n5) Return to the main menu",
        );

        userSelection = myPrompt("Please select an option: ");

        switch (userSelection) {
            case "1":
                readEmail(item.email);
                break;
            case "2":
                await readPassword(masterPassword, item.password);
                break;
            case "3":
                await updatePassword(masterPassword, item.id);
                exit = true
                break;
            case "4":
                deleteStatus = await handleDeleteItem(item.id);
                if (deleteStatus === DBStatus.ERROR) {
                    break;
                }
                exit = true;
                break;
            default:
                exit = true;
                break;
        }
    }
}
