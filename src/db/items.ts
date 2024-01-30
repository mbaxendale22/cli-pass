
import sqlite3 from "aa-sqlite";
import { NewItemData } from "../@types/customTypes";
import { DBStatus } from "../utils";
import { connectDB } from "./db_utils";

export async function itemsTableExists() {
    const qryStatment =
        "SELECT COUNT(*) FROM sqlite_master WHERE type='table' and name='items'";
    await connectDB();
    try {
        const result = await sqlite3.all(qryStatment);
        const rValue = result[0]["COUNT(*)"];
        if (rValue === 0) return false;
        return true;
    } catch (error) {
        console.log(error);
    } finally {
        sqlite3.close();
    }
}

export async function storeNewItem(newItemData: NewItemData) {
    const qryStatment =
        "insert into items (name, email, password, url, notes) values (?, ?, ?, ?, ?)";
    await connectDB();
    try {
        await sqlite3.push(qryStatment, [
            newItemData.name,
            newItemData.email,
            newItemData.password,
            newItemData.url,
            newItemData.notes,
        ]);
    } catch (error) {
        console.log(error);
    } finally {
        sqlite3.close();
    }
}

export async function findByIdAndDelete(id: number) {
    let status: DBStatus = DBStatus.ERROR;
    const qryStatement = "delete from items where id = ?";
    await connectDB();
    try {
        await sqlite3.push(qryStatement, [id]);
        status = DBStatus.SUCCESS;
    } catch (err) {
        console.log(err);
        status = DBStatus.ERROR;
    } finally {
        sqlite3.close();
    }
    return status;
}

export async function findByIdAndUpdate(id: number, newPassword: string) {
    let status: DBStatus = DBStatus.ERROR;
    const qryStatement = "update items set password = ? where id = ?";
    await connectDB();
    try {
        await sqlite3.push(qryStatement, [newPassword, id]);
        status = DBStatus.SUCCESS;
    } catch (err) {
        console.log(err);
        status = DBStatus.ERROR;
    } finally {
        sqlite3.close();
    }
    return status;
}
