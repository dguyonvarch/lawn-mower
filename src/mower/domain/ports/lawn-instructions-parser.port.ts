import { LawnInstructions } from '../value-objects/lawn-instructions.value-object'

export interface LawnInstructionsParser {
  fromText(content: string): LawnInstructions
}
