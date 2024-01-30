import { topLevelMenuChoice } from "./menu";
import { searchForPassword } from "./search";
import { createNewItem } from "./itemGeneration/newItemForms";
import { rudMenu } from "./readUpdateDeleteItems/rudMenu";
import { initApp } from "./startup";
import { Item } from "./@types/customTypes";
import { handleUserEmails } from "./userAdmin/createUserEmail";

// TODO: give user option to change params of generated password
// TODO: create manual password gen option

// test master password = "testpassword"
let active_master_password = "";

async function main() {
    let exit = false;

    active_master_password = await initApp();

    while (!exit) {
        let itemArr: Item[];
        const router = topLevelMenuChoice();
        switch (router) {
            case "1":
                itemArr = await searchForPassword();
                if (!itemArr.length) break;
                await rudMenu(itemArr.at(0), active_master_password);
                break;
            case "2":
                await createNewItem(active_master_password);
                break;
            case "3":
                await handleUserEmails();
                break;
            case "4":
                console.log("\nOkay bye now!\n");
                exit = true;
                break;
        }
    }
}

main();
