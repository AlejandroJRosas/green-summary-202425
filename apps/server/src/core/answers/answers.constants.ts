import { Answer } from './entities/answer.entity'

export const SORTABLE_FIELDS: Partial<keyof Answer>[] = ['id'] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
