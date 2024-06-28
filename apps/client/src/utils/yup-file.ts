import { mixed } from 'yup'

export function file() {
  return mixed((input: unknown): input is File => input instanceof File)
}
