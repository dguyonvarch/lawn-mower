export const LOGGER = 'LOGGER'

export interface Logger {
  log(message: string): void
  error(message: string, error?: string): void
}
