import { topLevelMenuChoice } from '../menu'
import * as mockPrompt from '../utils'
describe('topLevelMenuChoice unit tests', () => {
    const testInputValues = ['1', '2', '3']
    beforeEach(() => {
        jest.spyOn(mockPrompt, 'myPrompt')
        jest.spyOn(console, 'log').mockImplementation(() => {})
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    testInputValues.forEach((input) => {
        it(`returns ${input} when input is ${input}`, () => {
            const m = mockPrompt.myPrompt as jest.Mock
            m.mockReturnValue(input)
            const result = topLevelMenuChoice()

            expect(result).toBe(input)
        })
    })
})
