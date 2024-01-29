
import sqlite3 from "aa-sqlite";
import { UserEmails } from "../@types/customTypes";

async function connectDB() {
    try {
        await sqlite3.open("clipass.db");
    } catch (err) {
        console.log(err);
    }
}

export async function storeNewUserEmail(email: string) {
    const qryStatment = "insert into user_emails (email) values (?)";
    await connectDB();
    try {
        await sqlite3.push(qryStatment, [email]);
    } catch (err) {
        console.log("error storing new user email", err);
    } finally {
        sqlite3.close();
    }
}


export async function getUserEmails(): Promise<UserEmails[]> {
    let userEmails: UserEmails[] = [];
    await connectDB();
    try {
        userEmails = await sqlite3.all("select * from user_emails");
    } catch (err) {
        console.log("error retreiving user emails", err);
    } finally {
        sqlite3.close();
    }
    return userEmails;
}

export async function deleteStoredEmail(emailId: number) {
    const qryStatement = "delete from user_emails where id = ?";
    await connectDB();
    try {
        await sqlite3.push(qryStatement, [emailId]);
    } catch (err) {
        console.log(err);
    } finally {
        sqlite3.close();
    }
}


