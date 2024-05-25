export class WrongPasswordException extends Error {
  constructor() {
    super()
    this.name = this.constructor.name
  }
}
