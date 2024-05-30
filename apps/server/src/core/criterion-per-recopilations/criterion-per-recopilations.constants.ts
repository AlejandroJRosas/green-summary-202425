import { CriteriaPerRecopilation } from './entities/criteria-per-recopilation.entity'

export const SORTABLE_FIELDS: Partial<keyof CriteriaPerRecopilation>[] = [
  'id'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
