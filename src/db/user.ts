import sqlite3 from "aa-sqlite";
import { UserData } from "../@types/customTypes";

async function connectDB() {
    try {
        await sqlite3.open("clipass.db");
    } catch (err) {
        console.log(err);
    }
}

export async function userTableExists() {
    const qryStatment =
        "SELECT COUNT(*) FROM sqlite_master WHERE type='table' and name='user'";
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
// a function that creates a new user entry in the DB, values will be generated and passed in
export async function storeNewUser(userData: UserData) {
    const qryStatment =
        "insert into user (username, salt, keyLength, iterations, digest, hasMasterPassword) values (?, ?, ?, ?, ?, ?)";
    const { username, salt, keyLength, iterations, digest, hasMasterPassword } =
        userData;
    await connectDB();
    try {
        await sqlite3.push(qryStatment, [
            username,
            salt,
            keyLength,
            iterations,
            digest,
            hasMasterPassword,
        ]);
    } catch (error) {
        console.log(error);
    } finally {
        sqlite3.close();
    }
}

export async function getUser(): Promise<UserData | undefined> {
    const qryStatment = "select * from user";
    await connectDB();
    try {
        const result = await sqlite3.all(qryStatment);
        return result.at(0);
    } catch (error) {
        console.log(error);
    } finally {
        sqlite3.close();
    }
}
