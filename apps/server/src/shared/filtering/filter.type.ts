import { Delimiter, Operator } from './constants'

export interface Filter {
  field: string
  value: string
  operator: Operator
  delimiter: Delimiter
}
