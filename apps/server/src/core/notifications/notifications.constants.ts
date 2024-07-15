import { Notification } from './entities/notification.entity'

export const NOTIFICATION_TYPES = {
  RECOMMENDATION: 'recommendation',
  INFORMATION_COLLECTION_CREATION: 'information_collection_creation',
  INFORMATION_COLLECTION_EDITION: 'information_collection_edition',
  EVIDENCE_CREATION: 'evidence_creation',
  EVIDENCE_EDITION: 'evidence_edition',
  EVIDENCE_ERROR: 'evidence_error'
} as const
export const SORTABLE_FIELDS: Partial<keyof Notification>[] = [
  'id',
  'createdAt',
  'seen'
] as const

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES]
export type SortableField = (typeof SORTABLE_FIELDS)[number]
