import * as fs from 'fs/promises'

import { Inject } from '@nestjs/common'
import { Command, CommandRunner } from 'nest-commander'

import { ParserType } from '../../domain/enums/parser-type.enum'
import {
  ProcessMowerInstructions,
  PROCESS_MOWER_INSTRUCTIONS,
} from '../../domain/ports/process-mower-instructions.port'
import { LawnInstructionsParserFactory } from '../factories/lawn-instructions-parser.factory'

@Command({
  name: 'mow',
  description: 'Process mower instructions from a file',
})
export class MowerCommand extends CommandRunner {
  constructor(
    @Inject(PROCESS_MOWER_INSTRUCTIONS)
    private readonly processInstructions: ProcessMowerInstructions,
    private readonly parserFactory: LawnInstructionsParserFactory,
  ) {
    super()
  }

  async run(passedParams: string[]): Promise<void> {
    if (passedParams.length !== 1) {
      console.error('Please provide the input file path')
      return
    }

    const filePath = passedParams[0]

    try {
      const fileContent = await fs.readFile(filePath, 'utf-8')

      const lawnInstructionsParser = this.parserFactory.createParser(
        ParserType.TEXT_LINE,
      )
      const lawnInstructions = lawnInstructionsParser.fromText(fileContent)

      for (const mowerConfiguration of lawnInstructions.mowerConfigurations) {
        const finalPosition = this.processInstructions.execute(
          lawnInstructions.lawnSize,
          mowerConfiguration.initialCoordinates,
          mowerConfiguration.initialDirection,
          mowerConfiguration.instructions,
        )

        console.log(finalPosition.toString())
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error processing instructions:', error.message)
      } else {
        console.error('An unknown error occurred')
      }
      process.exit(1)
    }
  }
}
