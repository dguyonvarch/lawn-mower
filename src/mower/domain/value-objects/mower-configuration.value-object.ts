import { Coordinates } from './coordinates.value-object'
import { Direction } from './direction.value-object'
import { Instruction } from './instruction.value-object'

export class MowerConfiguration {
  constructor(
    public readonly initialCoordinates: Coordinates,
    public readonly initialDirection: Direction,
    public readonly instructions: Instruction[],
  ) {}
}
