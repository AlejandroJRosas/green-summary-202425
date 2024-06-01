import { DepartmentPerRecopilation } from './entities/departments-per-recopilation.entity'

export const SORTABLE_FIELDS: Partial<keyof DepartmentPerRecopilation>[] = [
  'id'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
