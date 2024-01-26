import sqlite3 from 'aa-sqlite'

const seedData = [

    {
        name: 'test_name_1',
        email: 'test1@email.com',
        password: 'test_password_1'
    },
    {
        name: 'test_name_2',
        email: 'test2@email.com',
        password: 'test_password_2'
    },
    {
        name: 'test_name_3',
        email: 'test3@email.com',
        password: 'test_password_3'
    },
    {
        name: 'test_name_4',
        email: 'test4@email.com',
        password: 'test_password_4'
    }

]
async function seedDB() {
    try {
        await sqlite3.open('pzwd.db')
        await sqlite3.push('delete from items')
        console.log('all items deleted from db')
        const qryStatement = 'insert into items (name, email, password) VALUES (?, ?, ?)'
        for (const item of seedData) {
            await sqlite3.push(qryStatement, [item.name, item.email, item.password])
        }
        console.log("completed seed successfully. Current state of the DB")
        const items = await sqlite3.all('select * from items')
        console.log(items)
    } catch (err) {
        console.log(err)
    }
}

seedDB()
