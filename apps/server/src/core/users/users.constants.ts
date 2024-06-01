import { User } from './entities/user.entity'

export const USER_TYPES = {
  COORDINATOR: 'coordinator',
  DEPARTMENT: 'department',
  ADMIN: 'admin'
} as const
export const SORTABLE_FIELDS: Partial<keyof User>[] = [
  'id',
  'fullName',
  'email',
  'type'
] as const

export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES]
export type SortableField = (typeof SORTABLE_FIELDS)[number]
