import sqlite3 from "aa-sqlite";
import { Item } from "../@types/customTypes";
import { connectDB } from "./db_utils";

export async function searchByFirstLetter(letter: string): Promise<Item[]> {
    await connectDB();
    try {
        const items = await sqlite3.all(
            "select * from items where name like ?",
            letter + "%",
        );
        return items;
    } catch (err) {
        console.log(err);
    } finally {
        sqlite3.close();
    }
}

export async function searchByName(name: string): Promise<Item[]> {
    await connectDB();
    try {
        const items = await sqlite3.all("select * from items where name = ?", name);
        return items;
    } catch (err) {
        console.log(err);
    } finally {
        sqlite3.close();
    }
}

export async function getAllItems(): Promise<Item[]> {
    await connectDB();
    try {
        const items = await sqlite3.all("select * from items");
        return items;
    } catch (err) {
        console.log(err);
    } finally {
        sqlite3.close();
    }
}
