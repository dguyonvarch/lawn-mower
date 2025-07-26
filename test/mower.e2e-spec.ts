import * as fs from 'fs/promises'
import * as path from 'path'

import { CommandTestFactory } from 'nest-commander-testing'

import { MowerModule } from '../src/mower/mower.module'

describe('Mower E2E Test', () => {
  const testFilePath = path.join(__dirname, 'test-instructions.txt')
  const testInput = `5 5
1 2 N
LFLFLFLFF
3 3 E
FFRFFRFRRF`

  const expectedOutput = ['1 3 N', '5 1 E']

  let logSpy: jest.SpyInstance

  beforeEach(() => {
    // Mock file read and console
    jest.spyOn(fs, 'readFile').mockResolvedValue(testInput)
    logSpy = jest.spyOn(console, 'log').mockImplementation()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should process mowers according to test case specifications', async () => {
    const command = await CommandTestFactory.createTestingCommand({
      imports: [MowerModule],
    }).compile()

    // Mock console.log pour capturer la sortie

    await CommandTestFactory.run(command, ['node', 'test', 'mow', testFilePath])

    expect(fs.readFile).toHaveBeenCalledWith(testFilePath, 'utf-8')

    // Verify each mower's output in order
    expectedOutput.forEach((output, index) => {
      expect(logSpy).toHaveBeenNthCalledWith(index + 1, output)
    })

    // Verify total number of outputs
    expect(logSpy).toHaveBeenCalledTimes(expectedOutput.length)

    logSpy.mockRestore()
  })
})
