import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { BackendResponse } from '../../shared/types/http-response.type'
import { BaseUrl } from '../../config'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { InformationCollection } from '../../shared/types/information-collection.type'

@Injectable({
  providedIn: 'root'
})
export class InformationCollectionService {
  constructor(private http: HttpClient) {}
  getAll(
    paginated: Paginated
  ): Observable<PaginatedResponse<InformationCollection, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<
      PaginatedResponse<InformationCollection, unknown, unknown>
    >(
      `${BaseUrl}/information-collections?itemsPerPage=5&page=${page}&orderType=DESC`
    )
  }
  getById(
    id: number
  ): Observable<BackendResponse<InformationCollection, unknown, unknown>> {
    return this.http.get<
      BackendResponse<InformationCollection, unknown, unknown>
    >(`${BaseUrl}/information-collections/${id}`)
  }
  create(
    informationCollection: InformationCollectionDTO
  ): Observable<BackendResponse<InformationCollection, unknown, unknown>> {
    return this.http.post<
      BackendResponse<InformationCollection, unknown, unknown>
    >(`${BaseUrl}/information-collections`, informationCollection)
  }
  edit(
    id: number,
    informationCollection: InformationCollectionDTO
  ): Observable<BackendResponse<InformationCollection, unknown, unknown>> {
    return this.http.patch<
      BackendResponse<InformationCollection, unknown, unknown>
    >(`${BaseUrl}/information-collections/${id}`, informationCollection)
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/information-collections/${id}`)
  }
}

export type InformationCollectionDTO = Omit<
  InformationCollection,
  'id' | 'evidences'
>
type Paginated = {
  first: number
  rows: number
}
