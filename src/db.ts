import sqlite3 from 'aa-sqlite'

import { DBStatus } from './utils'
import { Item, NewItemData, UserData } from './@types/customTypes'
async function connectDB() {
    try {
        await sqlite3.open('pzwd.db')
    } catch (err) {
        console.log(err)
    }
}
export async function searchByFirstLetter(letter: string): Promise<Item[]> {
    await connectDB()
    try {
        const items = await sqlite3.all(
            'select * from items where name like ?',
            letter + '%'
        )
        return items
    } catch (err) {
        console.log(err)
    } finally {
        sqlite3.close()
    }
}

export async function searchByName(name: string): Promise<Item[]> {
    await connectDB()
    try {
        const items = await sqlite3.all(
            'select * from items where name = ?',
            name
        )
        return items
    } catch (err) {
        console.log(err)
    } finally {
        sqlite3.close()
    }
}

export async function findByIdAndDelete(id: number) {
    let status: DBStatus = DBStatus.ERROR
    const qryStatement = 'delete from items where id = ?'
    await connectDB()
    try {
        await sqlite3.push(qryStatement, [id])
        status = DBStatus.SUCCESS
    } catch (err) {
        console.log(err)
        status = DBStatus.ERROR
    } finally {
        sqlite3.close()
    }
    return status

}

export async function userTableExists() {
    const qryStatment = "SELECT COUNT(*) FROM sqlite_master WHERE type='table' and name='user'"
    await connectDB()
    try {
        const result = await sqlite3.all(qryStatment)
        const rValue = result[0]['COUNT(*)']
        if (rValue === 0) return false
        return true
    } catch (error) {
        console.log(error)
    } finally {
        sqlite3.close()
    }
}

export async function itemsTableExists() {
    const qryStatment = "SELECT COUNT(*) FROM sqlite_master WHERE type='table' and name='items'"
    await connectDB()
    try {
        const result = await sqlite3.all(qryStatment)
        const rValue = result[0]['COUNT(*)']
        if (rValue === 0) return false
        return true
    } catch (error) {
        console.log(error)
    } finally {
        sqlite3.close()
    }
}
// TODO: a function that retrieves the user's salt from the DB
export async function getUserSalt() {
    const qryStatment = "SELECT COUNT(*) FROM sqlite_master WHERE type='table' and name='user'"
    await connectDB()
    try {
        const result = await sqlite3.all(qryStatment)
        result 
    } catch (error) {
        console.log(error)
    } finally {
        sqlite3.close()
    }
}



// a function that creates a new user entry in the DB, values will be generated and passed in
export async function storeNewUser(userData: UserData) {
    const qryStatment = "insert into user (username, salt, keyLength, iterations, digest, hasMasterPassword) values (?, ?, ?, ?, ?, ?)"
    const {username, salt, keyLength, iterations, digest, hasMasterPassword} = userData
    await connectDB()
    try {
        await sqlite3.push(qryStatment, [username, salt, keyLength, iterations, digest, hasMasterPassword])
    } catch (error) {
        console.log(error)
    } finally {
        sqlite3.close()
    }
}

export async function getUser(): Promise<UserData | undefined> {
    const qryStatment = "select * from user"
    await connectDB()
    try {
        const result = await sqlite3.all(qryStatment)
        return result.at(0)
    } catch (error) {
        console.log(error)
    } finally {
        sqlite3.close()
    }
}
export async function createUserTable() {
    const tableSchema = `id INTEGER, username TEXT, salt TEXT, keyLength INTEGER, iterations INTEGER, digest TEXT, hasMasterPassword INTEGER, PRIMARY KEY(id)`
    const qryStatment = `CREATE TABLE user (${tableSchema})`
    await connectDB()
    try {
        await sqlite3.run(qryStatment)
    } catch (error) {
        console.log(error)
    } finally {
        sqlite3.close()
    }
}

export async function createItemsTable() {
    const tableSchema = `id INTEGER, name TEXT, email TEXT, password TEXT, url TEXT, notes TEXT, PRIMARY KEY(id)`
    const qryStatment = `CREATE TABLE items (${tableSchema})`
    await connectDB()
    try {
        await sqlite3.run(qryStatment)
    } catch (err) {
        console.log(err)
    } finally {
        sqlite3.close()
    }
}

export async function storeNewItem(newItemData: NewItemData) {
    const qryStatment = "insert into items (name, email, password, url, notes) values (?, ?, ?, ?, ?)"
    await connectDB()
    try {
        await sqlite3.push(qryStatment, [newItemData.name, newItemData.email, newItemData.password, newItemData.url, newItemData.notes])
    } catch (error) {
        console.log(error)
    } finally {
        sqlite3.close()
    }
}
