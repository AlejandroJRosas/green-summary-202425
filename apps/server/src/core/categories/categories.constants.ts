import { Category } from './entities/category.entity'

export const SORTABLE_FIELDS: Partial<keyof Category>[] = [
  'id',
  'name',
  'helpText'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
