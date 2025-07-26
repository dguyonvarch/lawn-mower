import { Injectable } from '@nestjs/common'

import { ParserType } from '../../domain/enums/parser-type.enum'
import { LawnInstructionsParser } from '../../domain/ports/lawn-instructions-parser.port'
import { TextLineInstructionsParserAdapter } from '../adapters/text-line-instructions-parser.adapter'

@Injectable()
export class LawnInstructionsParserFactory {
  createParser(
    type: ParserType = ParserType.TEXT_LINE,
  ): LawnInstructionsParser {
    switch (type) {
      case ParserType.TEXT_LINE:
        return new TextLineInstructionsParserAdapter()
    }
  }
}
