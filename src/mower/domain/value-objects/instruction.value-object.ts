export enum MowerInstruction {
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F',
}

export class Instruction {
  constructor(private readonly value: MowerInstruction) {}

  getValue(): MowerInstruction {
    return this.value
  }

  static fromString(instruction: string): Instruction {
    if (
      !Object.values(MowerInstruction).includes(instruction as MowerInstruction)
    ) {
      throw new Error(`Invalid instruction: ${instruction}`)
    }
    return new Instruction(instruction as MowerInstruction)
  }
}
