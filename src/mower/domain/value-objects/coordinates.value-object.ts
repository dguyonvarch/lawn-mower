export class Coordinates {
  constructor(
    private readonly _x: number,
    private readonly _y: number,
  ) {
    this.validateCoordinates()
  }

  private validateCoordinates(): void {
    if (!Number.isInteger(this._x) || !Number.isInteger(this._y)) {
      throw new Error('Coordinates must be integers')
    }
    if (this._x < 0 || this._y < 0) {
      throw new Error('Coordinates cannot be negative')
    }
  }

  get x(): number {
    return this._x
  }

  get y(): number {
    return this._y
  }

  equals(other: Coordinates): boolean {
    return this._x === other.x && this._y === other.y
  }

  toString(): string {
    return `${this._x} ${this._y}`
  }
}
