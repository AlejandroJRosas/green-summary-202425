import { CategoryPerRecopilation } from './entities/category-per-recopilation.entity'

export const SORTABLE_FIELDS: Partial<keyof CategoryPerRecopilation>[] = [
  'id'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
