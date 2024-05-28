export const USER_TYPES = {
  COORDINATOR: 'coordinator',
  DEPARTMENT: 'department',
  ADMIN: 'admin'
} as const

export type UserType = (typeof USER_TYPES)[keyof typeof USER_TYPES]
