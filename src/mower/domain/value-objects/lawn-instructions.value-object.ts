import { Coordinates } from './coordinates.value-object'
import { MowerConfiguration } from './mower-configuration.value-object'

export class LawnInstructions {
  constructor(
    public readonly lawnSize: Coordinates,
    public readonly mowerConfigurations: MowerConfiguration[],
  ) {}
}
