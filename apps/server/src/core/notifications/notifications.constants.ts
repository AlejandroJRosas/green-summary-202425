import { Notification } from './entities/notification.entity'

export const SORTABLE_FIELDS: Partial<keyof Notification>[] = [
  'id',
  'createdAt',
  'seen'
] as const

export type SortableField = (typeof SORTABLE_FIELDS)[number]
