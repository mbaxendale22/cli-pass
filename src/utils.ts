import PromptSync from "prompt-sync"

export function checkForExit(exitPrompt: string) {
    if (exitPrompt === 'exit') {
        process.exit()
    }
}

export function myPrompt (message: string) {
    const prompt = PromptSync()
    const answer = prompt(message)
    checkForExit(answer)
    return answer
}
