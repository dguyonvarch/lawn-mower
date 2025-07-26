export enum CardinalDirection {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W',
}

export class Direction {
  private static readonly rotationMap = {
    [CardinalDirection.NORTH]: {
      left: CardinalDirection.WEST,
      right: CardinalDirection.EAST,
    },
    [CardinalDirection.EAST]: {
      left: CardinalDirection.NORTH,
      right: CardinalDirection.SOUTH,
    },
    [CardinalDirection.SOUTH]: {
      left: CardinalDirection.EAST,
      right: CardinalDirection.WEST,
    },
    [CardinalDirection.WEST]: {
      left: CardinalDirection.SOUTH,
      right: CardinalDirection.NORTH,
    },
  }

  static fromString(value: string): Direction {
    if (
      !Object.values(CardinalDirection).includes(value as CardinalDirection)
    ) {
      throw new Error(`Invalid direction: ${value}`)
    }
    return new Direction(value as CardinalDirection)
  }

  constructor(private readonly value: CardinalDirection) {}

  rotateLeft(): Direction {
    return new Direction(Direction.rotationMap[this.value].left)
  }

  rotateRight(): Direction {
    return new Direction(Direction.rotationMap[this.value].right)
  }

  getValue(): CardinalDirection {
    return this.value
  }

  toString(): string {
    return this.value
  }
}
