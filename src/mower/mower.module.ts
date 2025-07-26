import { Module } from '@nestjs/common'

import { ProcessMowerInstructionsUseCase } from './application/use-cases/process-mower-instructions.use-case'
import { PROCESS_MOWER_INSTRUCTIONS } from './domain/ports/process-mower-instructions.port'
import { TextLineInstructionsParserAdapter } from './infrastructure/adapters/text-line-instructions-parser.adapter'
import { MowerCommand } from './infrastructure/commands/mower.command'
import { LawnInstructionsParserFactory } from './infrastructure/factories/lawn-instructions-parser.factory'

@Module({
  providers: [
    {
      provide: PROCESS_MOWER_INSTRUCTIONS,
      useClass: ProcessMowerInstructionsUseCase,
    },
    LawnInstructionsParserFactory,
    TextLineInstructionsParserAdapter,
    MowerCommand,
  ],
})
export class MowerModule {}
