import sqlite3 from "aa-sqlite";
import path from "path";

const db_location = path.join(__dirname, '../../clipass.db')
export async function connectDB() {
    try {
        await sqlite3.open(db_location);
    } catch (err) {
        console.log(err);
    }
}
