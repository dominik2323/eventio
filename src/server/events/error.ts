export default class EventError extends Error {
  constructor(message: string) {
    super(`EventError: ${message}`)
    this.name = 'EventError'
  }
}
