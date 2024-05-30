import { Evidence } from './entities/evidence.entity'

export enum EvidenceType {
  DOCUMENT = 'document',
  IMAGE = 'image',
  LINK = 'link'
}

export const SORTABLE_FIELDS: Partial<keyof Evidence>[] = ['id'] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
