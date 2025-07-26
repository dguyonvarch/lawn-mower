import { Injectable } from '@nestjs/common'

import { Lawn } from '../../domain/entities/lawn.entity'
import { Mower } from '../../domain/entities/mower.entity'
import { ProcessMowerInstructions } from '../../domain/ports/process-mower-instructions.port'
import { Coordinates } from '../../domain/value-objects/coordinates.value-object'
import { Direction } from '../../domain/value-objects/direction.value-object'
import { Instruction } from '../../domain/value-objects/instruction.value-object'
import { MowerPosition } from '../../domain/value-objects/mower-position.value-object'

@Injectable()
export class ProcessMowerInstructionsUseCase
  implements ProcessMowerInstructions
{
  execute(
    lawnSize: Coordinates,
    initialPosition: Coordinates,
    initialDirection: Direction,
    instructions: Instruction[],
  ): MowerPosition {
    const lawn = new Lawn(lawnSize)
    const mower = new Mower(lawn, initialPosition, initialDirection)

    mower.executeInstructions(instructions)

    return new MowerPosition(mower.getCoordinates(), mower.getDirection())
  }
}
