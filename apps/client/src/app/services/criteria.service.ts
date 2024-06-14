import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BaseUrl } from '../../config'
import { Observable } from 'rxjs'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { BackendResponse } from '../../shared/types/http-response.type'
import { Criteria } from '../../shared/types/criterion.type'

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {
  constructor(private http: HttpClient) {}

  getAllCriterionByIndicatorIndex(
    id: number
  ): Observable<BackendResponse<Criteria[], unknown, unknown>> {
    return this.http.get<BackendResponse<Criteria[], unknown, unknown>>(
      `${BaseUrl}/criteria/indicator/${id}`
    )
  }

  getAll(
    paginated: Paginated
  ): Observable<PaginatedResponse<Criteria, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<Criteria, unknown, unknown>>(
      `${BaseUrl}/criteria?itemsPerPage=5&page=${page}&orderBy=id&orderType=DESC`
    )
  }

  getById(id: number): Observable<BackendResponse<Criteria, unknown, unknown>> {
    return this.http.get<BackendResponse<Criteria, unknown, unknown>>(
      `${BaseUrl}/criteria/${id}`
    )
  }

  create(
    criteria: CriteriaDTO
  ): Observable<BackendResponse<Criteria, unknown, unknown>> {
    return this.http.post<BackendResponse<Criteria, unknown, unknown>>(
      `${BaseUrl}/criteria`,
      criteria
    )
  }

  edit(
    id: number,
    criteria: CriteriaDTO
  ): Observable<BackendResponse<Criteria, unknown, unknown>> {
    return this.http.patch<BackendResponse<Criteria, unknown, unknown>>(
      `${BaseUrl}/criteria/${id}`,
      criteria
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/criteria/${id}`)
  }
}

export type CriteriaDTO = Omit<Criteria, 'id' | 'indicator'> & {
  indicatorIndex: number
}
type Paginated = {
  first: number
  rows: number
}
