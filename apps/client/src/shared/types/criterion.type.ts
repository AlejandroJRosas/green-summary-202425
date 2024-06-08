import { Indicator } from './indicator.type'

export interface Criteria {
  id: number
  subIndex: number
  name: string
  alias: string
  helpText: string
  requiresEvidence: boolean
  indicator: Indicator
}
