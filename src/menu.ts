import { selectSearchType } from './search'
import { myPrompt } from './utils'

export function topLevelMenuChoice() {
    let choice: string = ''
    let validChoice = false
    console.log(
        'Welcome to the password manager\n\nWhat would you like to do?\n'
    )
    console.log(
        '1) Use // Amend // Delete a password \n2) Create a new password \n3) See admin options\n4) Exit'
    )

    while (!validChoice) {
        choice = myPrompt('Please select an option: ')
        if (choice === '1' || choice === '2' || choice === '3'|| choice === '4') {
            validChoice = true
        }
    }
    return choice
}

export function searchTypeMenu() {
    let valid = false
    while (!valid) {
        console.log('\nHow would you like to search?\n\n1) By NAME\n2) By FIRST LETTER\n')
        const searchTypeInput = myPrompt('Please select an option: ')
        const searchType = selectSearchType(searchTypeInput)
        if (searchType) {
            valid = true
            return searchType
        }
        console.log('That is not a valid option. Please try again.')
    }
}


