import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BaseUrl } from '../../config'
import { Observable } from 'rxjs'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { User } from '../../shared/types/user.type'
import { BackendResponse } from '../../shared/types/http-response.type'
import { Indicator } from '../../shared/types/indicator.type'

@Injectable({
  providedIn: 'root'
})
export class IndicatorService {
  constructor(private http: HttpClient) {}

  getAll(
    paginated: Paginated
  ): Observable<PaginatedResponse<Indicator, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<Indicator, unknown, unknown>>(
      `${BaseUrl}/indicators?itemsPerPage=${rows}&page=${page}&orderBy=index&orderType=ASC`
    )
  }

  getById(
    id: number
  ): Observable<BackendResponse<Indicator, unknown, unknown>> {
    return this.http.get<BackendResponse<Indicator, unknown, unknown>>(
      `${BaseUrl}/indicators/${id}`
    )
  }

  create(
    indicator: CreateIndicatorDTO
  ): Observable<BackendResponse<User, unknown, unknown>> {
    return this.http.post<BackendResponse<User, unknown, unknown>>(
      `${BaseUrl}/indicators`,
      indicator
    )
  }

  edit(
    id: number,
    indicator: CreateIndicatorDTO
  ): Observable<BackendResponse<User, unknown, unknown>> {
    return this.http.patch<BackendResponse<User, unknown, unknown>>(
      `${BaseUrl}/indicators/${id}`,
      indicator
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/indicators/${id}`)
  }
}

export type CreateIndicatorDTO = Indicator

type Paginated = {
  first: number
  rows: number
}
