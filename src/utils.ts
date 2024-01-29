import PromptSync from "prompt-sync"

export function checkForExit(exitPrompt: string) {
    if (exitPrompt === 'exit') {
        process.exit()
    }
}

export function myPrompt (message: string) {
    const prompt = PromptSync()
    const answer = prompt(message).trim()
    checkForExit(answer)
    return answer
}

export enum DBStatus {
    SUCCESS = 'success',
    ERROR = 'error',
}

export function createNewFormField(prompt: string): string {
    let fieldConfirmed = false
    let field: string;

    while (!fieldConfirmed) {
        field = myPrompt(prompt)
        if (field === '') {
            console.log("You've chosen to leave this field blank, is this correct?")
        } else {
            console.log("You've entered: ", field, "\nis this correct?\n")
        }
        const confirm = myPrompt("Press Y to confirm or N to re-enter: ").toUpperCase()
        if (confirm === 'Y') {
            fieldConfirmed = true
        }
    }
    return field;
}
