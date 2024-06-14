import { Indicator } from './indicator.type'

export interface Category {
  id: number
  name: string
  helpText: string
  indicator: Indicator
}
