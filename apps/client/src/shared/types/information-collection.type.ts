import { Evidence } from './evidence.type'

export interface InformationCollection {
  id: number
  name: string
  summary: string
  evidences: Evidence[]
  recopilationId: number
  categoryId: number
  departmentId: number
}
