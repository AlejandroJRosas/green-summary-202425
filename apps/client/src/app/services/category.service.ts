import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BaseUrl } from '../../config'
import { Observable } from 'rxjs'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { BackendResponse } from '../../shared/types/http-response.type'
import { Category } from '../../shared/types/category.type'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategoriesByIndicatorIndex(
    id: number
  ): Observable<BackendResponse<Category[], unknown, unknown>> {
    return this.http.get<BackendResponse<Category[], unknown, unknown>>(
      `${BaseUrl}/categories/indicator/${id}`
    )
  }

  getAll(
    paginated: Paginated
  ): Observable<PaginatedResponse<Category, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<Category, unknown, unknown>>(
      `${BaseUrl}/categories?itemsPerPage=5&page=${page}&orderBy=id&orderType=DESC`
    )
  }

  getById(id: number): Observable<BackendResponse<Category, unknown, unknown>> {
    return this.http.get<BackendResponse<Category, unknown, unknown>>(
      `${BaseUrl}/categories/${id}`
    )
  }

  create(
    category: CategoryDTO
  ): Observable<BackendResponse<Category, unknown, unknown>> {
    return this.http.post<BackendResponse<Category, unknown, unknown>>(
      `${BaseUrl}/categories`,
      category
    )
  }

  edit(
    id: number,
    category: CategoryDTO
  ): Observable<BackendResponse<Category, unknown, unknown>> {
    return this.http.patch<BackendResponse<Category, unknown, unknown>>(
      `${BaseUrl}/categories/${id}`,
      category
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/categories/${id}`)
  }
}

export type CategoryDTO = Omit<Category, 'id' | 'indicator'> & {
  indicatorIndex: number
}

type Paginated = {
  first: number
  rows: number
}
