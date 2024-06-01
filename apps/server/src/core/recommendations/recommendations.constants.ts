import { Recommendation } from './entities/recommendation.entity'

export const SORTABLE_FIELDS: Partial<keyof Recommendation>[] = ['id'] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
