export class HttpErrorResponse {
  public error: string
  public message: string

  constructor(error: string, message: string) {
    this.error = error
    this.message = message
  }
}
