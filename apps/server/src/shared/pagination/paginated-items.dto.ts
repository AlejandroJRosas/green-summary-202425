export class PaginatedItems<T> {
  currentPage: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalPages: number
  totalItems: number
  items: T[]
}
