import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, map } from 'rxjs'
import { BackendResponse } from '../../shared/types/http-response.type'
import { BaseUrl } from '../../config'
import { PaginatedResponse } from '../../shared/types/paginated-response.type'
import { InformationCollection } from '../../shared/types/information-collection.type'
import { Department } from '../../shared/types/user.type'

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
      `${BaseUrl}/information-collections?itemsPerPage=100&page=${page}&orderType=DESC`
    )
  }
  getByDepartmentId(
    recopilationId: number,
    categoryId: number,
    departmentId: number
  ): Observable<
    BackendResponse<InformationCollectionByDepartment[], unknown, unknown>
  > {
    return this.http.get<
      BackendResponse<InformationCollectionByDepartment[], unknown, unknown>
    >(
      `${BaseUrl}/information-collections/department-answer/${recopilationId}/${categoryId}/${departmentId}`
    )
  }
  getById(
    id: number
  ): Observable<BackendResponse<InformationCollection, unknown, unknown>> {
    return this.http.get<
      BackendResponse<InformationCollection, unknown, unknown>
    >(`${BaseUrl}/information-collections/${id}`)
  }
  getByRecopilationAndCategory(
    recopilationId: number,
    categoryId: number
  ): Observable<DepartmentAnswer[]> {
    return this.http
      .get<
        BackendResponse<DepartmentAnswer[], unknown, unknown>
      >(`${BaseUrl}/information-collections/department-answer/${recopilationId}/${categoryId}`)
      .pipe(
        map((response) => (response.status === 'success' ? response.data : []))
      )
  }

  getByRecopilationAndCategoryFilterNoErrors(
    recopilationId: number,
    categoryId: number
  ): Observable<DepartmentAnswer[]> {
    return this.http
      .get<
        BackendResponse<DepartmentAnswer[], unknown, unknown>
      >(`${BaseUrl}/information-collections/department-answer/${recopilationId}/${categoryId}`)
      .pipe(
        map((response) =>
          response.status === 'success'
            ? response.data
                .map((departmentAnswer) => ({
                  ...departmentAnswer,
                  informationCollections:
                    departmentAnswer.informationCollections.filter(
                      (informationCollection) =>
                        informationCollection.isApproved &&
                        informationCollection.evidences.every(
                          (evidence) => evidence.error == null
                        )
                    )
                }))
                .filter(
                  (departmentAnswer) =>
                    departmentAnswer.informationCollections.length > 0
                )
            : []
        )
      )
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
  editInformationCollectionByDepartment(
    id: number,
    informationCollection: InformationCollectionByDepartment
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
export type InformationCollectionByDepartment = Omit<
  InformationCollection,
  'recopilationId' | 'categoryId' | 'departmentId'
>
type Paginated = {
  first: number
  rows: number
}
export type DepartmentAnswer = {
  department: Omit<Department, 'password'>
  informationCollections: Array<
    Omit<
      InformationCollection,
      'departmentId' | 'categoryId' | 'recopilationId'
    >
  >
}
