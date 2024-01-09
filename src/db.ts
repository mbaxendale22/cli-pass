import sqlite3 from 'aa-sqlite'

export interface Item {
    id: number
    name: string
    email: string
    password: string
    url: string | null
    notes: string | null
}

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
