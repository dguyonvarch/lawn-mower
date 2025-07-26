import { CommandFactory } from 'nest-commander'

import { MowerModule } from './mower/mower.module'

async function bootstrap() {
  await CommandFactory.run(MowerModule)
}

bootstrap().catch((err) => {
  console.error('Unhandled error:', err)
  process.exit(1)
})
