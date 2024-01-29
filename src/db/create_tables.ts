import sqlite3 from "aa-sqlite";
async function connectDB() {
    try {
        await sqlite3.open("clipass.db");
    } catch (err) {
        console.log(err);
    }
}
export async function createUserTable() {
    const tableSchema = `id INTEGER, username TEXT, salt TEXT, keyLength INTEGER, iterations INTEGER, digest TEXT, hasMasterPassword INTEGER, PRIMARY KEY(id)`;
    const qryStatment = `CREATE TABLE user (${tableSchema})`;
    await connectDB();
    try {
        await sqlite3.run(qryStatment);
    } catch (error) {
        console.log(error);
    } finally {
        sqlite3.close();
    }
}

export async function createItemsTable() {
    const tableSchema = `id INTEGER, name TEXT, email TEXT, password TEXT, url TEXT, notes TEXT, PRIMARY KEY(id)`;
    const qryStatment = `CREATE TABLE items (${tableSchema})`;
    await connectDB();
    try {
        await sqlite3.run(qryStatment);
    } catch (err) {
        console.log(err);
    } finally {
        sqlite3.close();
    }
}

export async function createUserEmailsTable() {
    const tableSchema = `id INTEGER, email TEXT, PRIMARY KEY(id)`;
    const qryStatment = `CREATE TABLE user_emails (${tableSchema})`;
    await connectDB();
    try {
        await sqlite3.run(qryStatment);
    } catch (err) {
        console.log(err);
    } finally {
        sqlite3.close();
    }
}
