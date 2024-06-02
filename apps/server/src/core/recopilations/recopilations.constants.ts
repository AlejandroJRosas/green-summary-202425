import { Recopilation } from './entities/recopilation.entity'

export const SORTABLE_FIELDS: Partial<keyof Recopilation>[] = [
  'id',
  'name',
  'startDate',
  'endDate',
  'description',
  'departmentEndDate'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
