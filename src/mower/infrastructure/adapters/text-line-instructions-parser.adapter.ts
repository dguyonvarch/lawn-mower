import { LawnInstructionsParser } from '../../domain/ports/lawn-instructions-parser.port'
import { Coordinates } from '../../domain/value-objects/coordinates.value-object'
import { Direction } from '../../domain/value-objects/direction.value-object'
import { Instruction } from '../../domain/value-objects/instruction.value-object'
import { LawnInstructions } from '../../domain/value-objects/lawn-instructions.value-object'
import { MowerConfiguration } from '../../domain/value-objects/mower-configuration.value-object'

export class TextLineInstructionsParserAdapter
  implements LawnInstructionsParser
{
  fromText(content: string): LawnInstructions {
    const lines = content.trim().split('\n')
    const [maxX, maxY] = lines[0].split(' ').map(Number)

    const lawnSize = new Coordinates(maxX, maxY)
    const mowerConfigurations: MowerConfiguration[] = []

    for (let i = 1; i < lines.length; i += 2) {
      const [x, y, directionStr] = lines[i].split(' ')
      const instructions = lines[i + 1].split('')

      mowerConfigurations.push(
        new MowerConfiguration(
          new Coordinates(Number(x), Number(y)),
          Direction.fromString(directionStr),
          instructions.map((instruction) =>
            Instruction.fromString(instruction),
          ),
        ),
      )
    }

    return new LawnInstructions(lawnSize, mowerConfigurations)
  }
}
