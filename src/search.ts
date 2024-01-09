import { Item } from './db'
import {  myPrompt } from './utils'
import * as clipboard from 'clipboardy'

export enum SearchType {
    NAME = '1',
    LETTER = '2',
}

export function selectSearchType(searchType: string) {
    if (searchType === SearchType.NAME) {
        return SearchType.NAME
    }
    if (searchType === SearchType.LETTER) {
        return SearchType.LETTER
    }
    return null
}

export function handleSingleResult(item: Item) {
    console.log('\n******* Found password ******\n')
    console.log(`id: ${item.id}, name: ${item.name}, email: ${item.email}`)

    const copyPassword = myPrompt(
        'Would you like to copy the password to the clipboard? Y/N '
    ).toUpperCase()

    if (copyPassword === 'Y') {
        clipboard.writeSync(item.password)
        console.log('Password copied to clipboard')
    }
}

export function handleMultipleResults(results: Item[]) {
    console.log('\n****** Multiple passwords found *******\n')

    results.forEach((result) => {
        console.log(
            `id: ${result.id}, name: ${result.name}, email: ${result.email}`
        )
    })

    let name = myPrompt(' \nPlease select a single item by id: ')
    let item = results.find((result) => result.id === Number(name))

    while (!item) {
        console.log('That is not a valid id. Please try again.')
        name = myPrompt('Please select a single item by id: ')
        item = results.find((result) => result.id === Number(name))
    }

    handleSingleResult(item)
}
