import { InformationCollection } from './entities/information-collection.entity'

export const SORTABLE_FIELDS: Partial<keyof InformationCollection>[] = [
  'id',
  'summary',
  'createdAt'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
