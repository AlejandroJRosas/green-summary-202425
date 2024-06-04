import { Criteria } from './entities/criteria.entity'

export const SORTABLE_FIELDS: Partial<keyof Criteria>[] = [
  'subIndex',
  'name',
  'requiresEvidence',
  'alias',
  'helpText'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
