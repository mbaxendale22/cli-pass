import { selectSearchType } from './search'
import { myPrompt } from './utils'

export function topLevelMenuChoice() {
    let choice: string = ''
    let validChoice = false
    console.log(
        'Welcome to the password manager\n\nWhat would you like to do?\n'
    )
    console.log(
        '1) Search for a password \n2) Create a new password \n3) Exit\n'
    )

    while (!validChoice) {
        choice = myPrompt('Please select an option: ')
        if (choice === '1' || choice === '2' || choice === '3') {
            validChoice = true
        }
    }
    return choice
}

export function searchTypeMenu() {
    let valid = false
    while (!valid) {
        console.log('How would you like to search?')
        console.log('1) By NAME')
        console.log('2) By FIRST LETTER')
        const searchTypeInput = myPrompt('Please select an option: ')
        const searchType = selectSearchType(searchTypeInput)
        if (searchType) {
            valid = true
            return searchType
        }
        console.log('That is not a valid option. Please try again.')
    }
}

export function singlePasswordMenu() {
    console.log(
        'What would you like to do?\n1) Use password\n2) Update password\n3) Delete item\n4) Return to main menu'
    )
    const choice = myPrompt('Please select an option: ')
    return choice
}

