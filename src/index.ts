import PromptSync from 'prompt-sync'
import { Item, searchByFirstLetter, searchByName } from './db'
import {
    SearchType,
    handleMultipleResults,
    handleSingleResult,
} from './search'
import { checkForExit, myPrompt } from './utils'
import { searchTypeMenu, topLevelMenuChoice } from './menu'

const prompt = PromptSync()

async function searchForPassword() {
    const searchType = searchTypeMenu()
    let items: Item[] = []

    if (searchType === SearchType.NAME) {
        const searchTerm = prompt('What is the name of the item? ')
        checkForExit(searchTerm)
        items = await searchByName(searchTerm)
        if (!items.length) {
            console.log('No passwords found')
        }
        handleSingleResult(items[0])
    }
    if (searchType === SearchType.LETTER) {
        const searchLetter = prompt('What is the first letter of the name? ')
        checkForExit(searchLetter)
        items = await searchByFirstLetter(searchLetter)
        if (!items.length) {
            console.log('No passwords found')
        }
        if (items.length === 1) {
            handleSingleResult(items[0])
        }
        handleMultipleResults(items)
    }
}

async function main() {
    let exit = false
    while (!exit) {
        const router = topLevelMenuChoice()

        switch (router) {
            case '1':
                await searchForPassword()
                break
            case '2':
                console.log('create new password')
                break
            case '3':
                exit = true
                break
        }
    }
}

main()
