import { CategorizedCriteria } from './entities/categorized-criterion.entity'

export const SORTABLE_FIELDS: Partial<keyof CategorizedCriteria>[] = [
  'id'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
