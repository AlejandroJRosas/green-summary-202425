import { PaginatedItems } from './paginated-items.dto'

export function constructPaginatedItemsDto<T>(
  items: T[],
  totalItems: number,
  currentPage: number,
  itemsPerPage: number
): PaginatedItems<T> {
  console.log(totalItems, itemsPerPage)
  return {
    currentPage,
    itemsPerPage,
    hasNextPage: currentPage < totalItems / itemsPerPage,
    hasPreviousPage: currentPage > 1,
    totalPages: Math.ceil(totalItems / itemsPerPage),
    totalItems,
    items
  }
}
