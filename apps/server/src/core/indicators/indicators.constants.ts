import { Indicator } from './entities/indicator.entity'

export const SORTABLE_FIELDS: Partial<keyof Indicator>[] = [
  'index',
  'name',
  'alias',
  'textHelp'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
