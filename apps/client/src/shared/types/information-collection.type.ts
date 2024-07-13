import { Evidence } from './evidence.type'

export interface InformationCollection {
  id: number
  name: string
  summary: string
  evidences: Evidence[]
  isApproved: boolean
  recopilationId: number
  categoryId: number
  departmentId: number
}
