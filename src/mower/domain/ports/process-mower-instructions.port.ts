import { Coordinates } from '../value-objects/coordinates.value-object'
import { Direction } from '../value-objects/direction.value-object'
import { Instruction } from '../value-objects/instruction.value-object'
import { MowerPosition } from '../value-objects/mower-position.value-object'

export const PROCESS_MOWER_INSTRUCTIONS = 'PROCESS_MOWER_INSTRUCTIONS'

export interface ProcessMowerInstructions {
  execute(
    lawnSize: Coordinates,
    initialPosition: Coordinates,
    initialDirection: Direction,
    instructions: Instruction[],
  ): MowerPosition
}
