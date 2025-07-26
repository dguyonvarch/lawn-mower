import { Coordinates } from './coordinates.value-object'
import { Direction } from './direction.value-object'

export class MowerPosition {
  constructor(
    public readonly coordinates: Coordinates,
    public readonly direction: Direction,
  ) {}

  toString(): string {
    return `${this.coordinates.toString()} ${this.direction.toString()}`
  }
}
