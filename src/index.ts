
import { topLevelMenuChoice } from './menu'
import { searchForPassword } from './search'
import { createNewItem } from './itemGeneration/newItemForms'
import { rudMenu } from './readUpdateDeleteItems/rudMenu'
import { initApp } from './startup'
import { Item } from './@types/customTypes'

// TODO: give user option to change params of generated password
// TODO: give user option to preview enerated password and regen if necessary
// TODO: allow user to generate a new password for an existing item
// TODO: allow user to save email accounts for quick entry

// test master password = "testpassword"
let active_master_password = ''

async function main() {
    let exit = false

    active_master_password = await initApp() 


    while (!exit) {
        let itemArr: Item[]
        const router = topLevelMenuChoice()
        switch (router) {
            case '1':
                itemArr = await searchForPassword()
                if (!itemArr.length) break
                // user select between view, amend, delete an item
                await rudMenu(itemArr.at(0), active_master_password)
                break
            case '2':
                await createNewItem(active_master_password)
                break
            case '3':
                console.log('admin options')
                break
            case '4':
                console.log("\nOkay bye now!\n")
                exit = true
                break
        }

    }
}


main()

