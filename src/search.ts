import { Item } from "./@types/customTypes";
import { searchByFirstLetter, searchByName } from "./db";
import { searchTypeMenu } from "./menu";
import { myPrompt } from "./utils";

export enum SearchType {
    NAME = "1",
    LETTER = "2",
}
export async function searchForPassword() {
    const searchType = searchTypeMenu();
    let items: Item[] = [];

    if (searchType === SearchType.NAME) {
        const searchTerm = myPrompt("What is the name of the item? ");
        items = await searchByName(searchTerm);
        if (!items.length) {
            console.log("No passwords found");
            return items;
        }
        return items;
    }

    if (searchType === SearchType.LETTER) {
        const searchLetter = myPrompt("What is the first letter of the name? ");
        items = await searchByFirstLetter(searchLetter);
        if (!items.length) {
            console.log("No passwords found");
            return items;
        }
        if (items.length === 1) {
            return items;
        }
        return handleMultipleResults(items);
    }
}

export function selectSearchType(searchType: string) {
    if (searchType === SearchType.NAME) {
        return SearchType.NAME;
    }
    if (searchType === SearchType.LETTER) {
        return SearchType.LETTER;
    }
    return null;
}

export function handleMultipleResults(results: Item[]) {
    console.log("\n****** Multiple passwords found *******\n");

    results.forEach((result) => {
        console.log(
            `id: ${result.id}, name: ${result.name}, email: ${result.email}`,
        );
    });

    let name = myPrompt("Please select a single item by id: ");
    let item = results.find((result) => result.id === Number(name));

    while (!item) {
        console.log("That is not a valid id. Please try again.");
        name = myPrompt("Please select a single item by id: ");
        item = results.find((result) => result.id === Number(name));
    }

    return [item];
}
