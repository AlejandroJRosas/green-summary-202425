import { BackendResponse } from './http-response.type'

export type PaginatedResponse<T, U, V> = BackendResponse<
  PaginatedItems<T>,
  U,
  V
>

interface PaginatedItems<T> {
  currentPage: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalPages: number
  totalItems: number
  items: T[]
}
