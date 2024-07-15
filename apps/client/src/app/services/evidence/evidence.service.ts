import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BackendResponse } from '../../../shared/types/http-response.type'
import { BaseUrl } from '../../../config'
import { PaginatedResponse } from '../../../shared/types/paginated-response.type'
import { Observable } from 'rxjs'
import { Evidence } from '../../../shared/types/evidence.type'

@Injectable({
  providedIn: 'root'
})
export class EvidenceService {
  constructor(private http: HttpClient) {}
  getAll(
    paginated: Paginated
  ): Observable<PaginatedResponse<Evidence, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<Evidence, unknown, unknown>>(
      `${BaseUrl}/evidences?itemsPerPage=5&page=${page}&orderType=DESC`
    )
  }
  getById(id: number): Observable<BackendResponse<Evidence, unknown, unknown>> {
    return this.http.get<BackendResponse<Evidence, unknown, unknown>>(
      `${BaseUrl}/evidences/${id}`
    )
  }
  create(
    evidence: FormData
  ): Observable<BackendResponse<Evidence, unknown, unknown>> {
    return this.http.post<BackendResponse<Evidence, unknown, unknown>>(
      `${BaseUrl}/evidences`,
      evidence
    )
  }
  edit(
    id: number,
    evidence: FormData
  ): Observable<BackendResponse<Evidence, unknown, unknown>> {
    return this.http.patch<BackendResponse<Evidence, unknown, unknown>>(
      `${BaseUrl}/evidences/${id}`,
      evidence
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/evidences/${id}`)
  }
}

export type EvidenceDTO = Omit<Evidence, 'id' | 'collection' | 'error'> & {
  collectionId: string
}
type Paginated = {
  first: number
  rows: number
}
