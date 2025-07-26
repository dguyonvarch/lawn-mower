import { Lawn } from './lawn.entity'
import { Mower } from './mower.entity'
import { Coordinates } from '../value-objects/coordinates.value-object'
import {
  Direction,
  CardinalDirection,
} from '../value-objects/direction.value-object'
import {
  Instruction,
  MowerInstruction,
} from '../value-objects/instruction.value-object'

describe('Mower', () => {
  let lawn: Lawn
  let mower: Mower
  const lawnSize = new Coordinates(5, 5)
  const initialPosition = new Coordinates(1, 2)
  const initialDirection = new Direction(CardinalDirection.NORTH)

  beforeEach(() => {
    lawn = new Lawn(lawnSize)
    mower = new Mower(lawn, initialPosition, initialDirection)
  })

  describe('rotation', () => {
    it('should rotate left from North to West', () => {
      mower.executeInstructions([new Instruction(MowerInstruction.LEFT)])
      expect(mower.getDirection().getValue()).toBe(CardinalDirection.WEST)
    })

    it('should rotate right from North to East', () => {
      mower.executeInstructions([new Instruction(MowerInstruction.RIGHT)])
      expect(mower.getDirection().getValue()).toBe(CardinalDirection.EAST)
    })

    it('should complete a full rotation to the left', () => {
      const fullRotation = [
        MowerInstruction.LEFT,
        MowerInstruction.LEFT,
        MowerInstruction.LEFT,
        MowerInstruction.LEFT,
      ]

      mower.executeInstructions(
        fullRotation.map((instruction) => new Instruction(instruction)),
      )

      expect(mower.getDirection().getValue()).toBe(CardinalDirection.NORTH)
      expect(mower.getCoordinates()).toEqual(initialPosition)
    })
  })

  describe('movement', () => {
    it('should move forward when space is available', () => {
      mower.executeInstructions([new Instruction(MowerInstruction.FORWARD)])
      expect(mower.getCoordinates()).toEqual(new Coordinates(1, 3))
    })

    it('should not move forward when hitting lawn boundary', () => {
      // Move to the edge
      const moveToEdge = Array.from(
        { length: 5 },
        () => new Instruction(MowerInstruction.FORWARD),
      )
      mower.executeInstructions(moveToEdge)

      // Try to move beyond
      mower.executeInstructions([new Instruction(MowerInstruction.FORWARD)])

      expect(mower.getCoordinates().y).toBe(5)
    })

    it('should execute a sequence of instructions correctly', () => {
      const instructions = [
        MowerInstruction.LEFT,
        MowerInstruction.FORWARD,
        MowerInstruction.LEFT,
        MowerInstruction.FORWARD,
        MowerInstruction.LEFT,
        MowerInstruction.FORWARD,
        MowerInstruction.LEFT,
        MowerInstruction.FORWARD,
      ]

      mower.executeInstructions(
        instructions.map((instruction) => new Instruction(instruction)),
      )

      // Should be back at the starting position after drawing a square
      expect(mower.getCoordinates()).toEqual(initialPosition)
      expect(mower.getDirection().getValue()).toBe(CardinalDirection.NORTH)
    })
  })

  describe('test case scenario', () => {
    it('should handle the first test case correctly', () => {
      const instructions = [
        MowerInstruction.LEFT,
        MowerInstruction.FORWARD,
        MowerInstruction.LEFT,
        MowerInstruction.FORWARD,
        MowerInstruction.LEFT,
        MowerInstruction.FORWARD,
        MowerInstruction.LEFT,
        MowerInstruction.FORWARD,
        MowerInstruction.FORWARD,
      ]

      mower.executeInstructions(
        instructions.map((instruction) => new Instruction(instruction)),
      )

      expect(mower.getCoordinates()).toEqual(new Coordinates(1, 3))
      expect(mower.getDirection().getValue()).toBe(CardinalDirection.NORTH)
    })

    it('should handle the second test case correctly', () => {
      const mower2 = new Mower(
        lawn,
        new Coordinates(3, 3),
        new Direction(CardinalDirection.EAST),
      )

      const instructions = [
        MowerInstruction.FORWARD,
        MowerInstruction.FORWARD,
        MowerInstruction.RIGHT,
        MowerInstruction.FORWARD,
        MowerInstruction.FORWARD,
        MowerInstruction.RIGHT,
        MowerInstruction.FORWARD,
        MowerInstruction.RIGHT,
        MowerInstruction.RIGHT,
        MowerInstruction.FORWARD,
      ]

      mower2.executeInstructions(
        instructions.map((instruction) => new Instruction(instruction)),
      )

      expect(mower2.getCoordinates()).toEqual(new Coordinates(5, 1))
      expect(mower2.getDirection().getValue()).toBe(CardinalDirection.EAST)
    })
  })
})
