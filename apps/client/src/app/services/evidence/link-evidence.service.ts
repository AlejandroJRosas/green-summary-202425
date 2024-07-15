import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BackendResponse } from '../../../shared/types/http-response.type'
import { BaseUrl } from '../../../config'
import { PaginatedResponse } from '../../../shared/types/paginated-response.type'
import { Observable } from 'rxjs'
import { Evidence } from '../../../shared/types/evidence.type'
import { EvidenceDTO } from './evidence.service'

@Injectable({
  providedIn: 'root'
})
export class LinkEvidenceService {
  constructor(private http: HttpClient) {}
  getAll(
    paginated: Paginated
  ): Observable<PaginatedResponse<Evidence, unknown, unknown>> {
    const { first, rows } = paginated
    const page = first / rows + 1
    return this.http.get<PaginatedResponse<Evidence, unknown, unknown>>(
      `${BaseUrl}/links?itemsPerPage=5&page=${page}&orderType=DESC`
    )
  }
  getById(id: number): Observable<BackendResponse<Evidence, unknown, unknown>> {
    return this.http.get<BackendResponse<Evidence, unknown, unknown>>(
      `${BaseUrl}/links/${id}`
    )
  }
  create(
    evidenceLink: EvidenceDTO
  ): Observable<BackendResponse<Evidence, unknown, unknown>> {
    return this.http.post<BackendResponse<Evidence, unknown, unknown>>(
      `${BaseUrl}/links`,
      evidenceLink
    )
  }
  edit(
    id: number,
    evidenceLink: EvidenceLinkDTO
  ): Observable<BackendResponse<Evidence, unknown, unknown>> {
    return this.http.patch<BackendResponse<Evidence, unknown, unknown>>(
      `${BaseUrl}/links/${id}`,
      evidenceLink
    )
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${BaseUrl}/links/${id}`)
  }
}
export type EvidenceLinkDTO = Omit<
  EvidenceDTO,
  'fileLink' | 'collectionId' | 'error'
>
type Paginated = {
  first: number
  rows: number
}
