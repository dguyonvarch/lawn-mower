import { Coordinates } from '../value-objects/coordinates.value-object'

export class Lawn {
  constructor(private readonly upperRight: Coordinates) {
    if (upperRight.x < 0 || upperRight.y < 0) {
      throw new Error('Lawn size cannot be negative')
    }
  }

  isValidCoordinates(coordinates: Coordinates): boolean {
    return (
      coordinates.x >= 0 &&
      coordinates.y >= 0 &&
      coordinates.x <= this.upperRight.x &&
      coordinates.y <= this.upperRight.y
    )
  }
}
