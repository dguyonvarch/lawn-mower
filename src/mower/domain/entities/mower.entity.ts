import { Lawn } from './lawn.entity'
import { Coordinates } from '../value-objects/coordinates.value-object'
import {
  Direction,
  CardinalDirection,
} from '../value-objects/direction.value-object'
import {
  Instruction,
  MowerInstruction,
} from '../value-objects/instruction.value-object'

export class Mower {
  constructor(
    private readonly lawn: Lawn,
    private coordinates: Coordinates,
    private direction: Direction,
  ) {}

  private calculateNextCoordinates(): Coordinates {
    let newX = this.coordinates.x
    let newY = this.coordinates.y

    switch (this.direction.getValue()) {
      case CardinalDirection.NORTH:
        newY++
        break
      case CardinalDirection.EAST:
        newX++
        break
      case CardinalDirection.SOUTH:
        newY--
        break
      case CardinalDirection.WEST:
        newX--
        break
    }

    return new Coordinates(newX, newY)
  }

  private executeInstruction(instruction: Instruction): void {
    let nextCoordinates: Coordinates

    switch (instruction.getValue()) {
      case MowerInstruction.LEFT:
        this.direction = this.direction.rotateLeft()
        break
      case MowerInstruction.RIGHT:
        this.direction = this.direction.rotateRight()
        break
      case MowerInstruction.FORWARD:
        nextCoordinates = this.calculateNextCoordinates()
        if (this.lawn.isValidCoordinates(nextCoordinates)) {
          this.coordinates = nextCoordinates
        }
        break
    }
  }

  executeInstructions(instructions: Instruction[]): void {
    for (const instruction of instructions) {
      this.executeInstruction(instruction)
    }
  }

  getDirection(): Direction {
    return this.direction
  }

  getCoordinates(): Coordinates {
    return this.coordinates
  }
}
